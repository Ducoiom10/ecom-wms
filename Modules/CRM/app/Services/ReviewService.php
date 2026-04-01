<?php

namespace Modules\CRM\Services;

use App\Core\Services\BaseService;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Modules\CRM\Models\Address;
use Modules\CRM\Models\Review;
use Exception;

class ReviewService extends BaseService
{
    public function submitReview(int $productId, int $userId, int $rating, string $content, ?string $title = null): Review
    {
        if ($rating < 1 || $rating > 5) {
            throw new Exception('Rating must be between 1 and 5.');
        }

        return Review::updateOrCreate(
            ['product_id' => $productId, 'user_id' => $userId],
            ['rating' => $rating, 'content' => $content, 'title' => $title, 'is_visible' => true, 'is_flagged' => false]
        );
    }

    public function flagInappropriateReview(int $reviewId): void
    {
        Review::whereKey($reviewId)->update(['is_flagged' => true, 'is_visible' => false]);
    }

    /**
     * Simple collaborative recommendation: products reviewed highly by users
     * who also reviewed the same products as this user.
     */
    public function generateRecommendations(User $user, int $limit = 5): array
    {
        $reviewedProductIds = Review::where('user_id', $user->id)->pluck('product_id');

        return Review::whereNotIn('product_id', $reviewedProductIds)
            ->where('rating', '>=', 4)
            ->where('is_visible', true)
            ->select('product_id', DB::raw('AVG(rating) as avg_rating'), DB::raw('COUNT(*) as review_count'))
            ->groupBy('product_id')
            ->orderByDesc('avg_rating')
            ->orderByDesc('review_count')
            ->limit($limit)
            ->pluck('product_id')
            ->toArray();
    }

    // ── Address Management ──────────────────────────────────────

    public function addAddress(User $user, array $data): Address
    {
        return DB::transaction(function () use ($user, $data) {
            if (!empty($data['is_default'])) {
                // Unset existing default atomically before creating new one
                $user->addresses()->update(['is_default' => false]);
            }
            return $user->addresses()->create($data);
        });
    }

    public function getAddressForOrder(User $user, ?int $addressId = null): ?Address
    {
        if ($addressId) {
            return $user->addresses()->findOrFail($addressId);
        }
        return $user->addresses()->where('is_default', true)->first();
    }
}
