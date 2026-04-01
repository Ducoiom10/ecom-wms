<?php

namespace Modules\CRM\Services;

use App\Core\Services\BaseService;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Modules\CRM\Models\LoyaltyAccount;
use Modules\CRM\Models\LoyaltyTransaction;
use Exception;

class LoyaltyService extends BaseService
{
    public function getOrCreateAccount(User $user): LoyaltyAccount
    {
        return LoyaltyAccount::firstOrCreate(
            ['user_id' => $user->id],
            ['points' => 0, 'tier' => 'bronze', 'total_redeemed' => 0]
        );
    }

    /**
     * Award points atomically with tier upgrade check.
     */
    public function awardPoints(User $user, int $points, string $reason, ?int $referenceId = null): void
    {
        if ($points <= 0) return;

        DB::transaction(function () use ($user, $points, $reason, $referenceId) {
            $account = LoyaltyAccount::lockForUpdate()
                ->where('user_id', $user->id)
                ->firstOrCreate(['user_id' => $user->id]);

            $account->increment('points', $points);
            $account->refresh();

            LoyaltyTransaction::create([
                'loyalty_account_id' => $account->id,
                'points'             => $points,
                'type'               => 'earn',
                'reason'             => $reason,
                'reference_id'       => $referenceId,
            ]);

            $this->upgradeCustomerTier($account);
        });
    }

    /**
     * Redeem points — returns discount amount in dollars.
     * 100 points = $1.00 discount.
     */
    public function redeemPoints(User $user, int $points): float
    {
        return DB::transaction(function () use ($user, $points) {
            $account = LoyaltyAccount::lockForUpdate()
                ->where('user_id', $user->id)
                ->firstOrFail();

            if ($account->points < $points) {
                throw new Exception("Insufficient loyalty points. Available: {$account->points}");
            }

            $account->decrement('points', $points);
            $account->increment('total_redeemed', $points);

            LoyaltyTransaction::create([
                'loyalty_account_id' => $account->id,
                'points'             => -$points,
                'type'               => 'redeem',
                'reason'             => 'Order discount',
            ]);

            return round($points / 100, 2); // 100 points = $1
        });
    }

    /**
     * Upgrade tier based on current points — only upgrades, never downgrades.
     */
    public function upgradeCustomerTier(LoyaltyAccount $account): void
    {
        $newTier = $account->resolveTier();

        if ($newTier !== $account->tier) {
            $account->update(['tier' => $newTier]);
        }
    }

    public function getCustomerBenefits(User $user): array
    {
        $account = $this->getOrCreateAccount($user);
        $config  = LoyaltyAccount::TIERS[$account->tier];

        return [
            'tier'             => $account->tier,
            'points'           => $account->points,
            'multiplier'       => $config['multiplier'],
            'discount_pct'     => $config['discount'] * 100,
            'birthday_bonus'   => $config['birthday_bonus'],
            'free_shipping'    => in_array($account->tier, ['gold', 'platinum']),
        ];
    }
}
