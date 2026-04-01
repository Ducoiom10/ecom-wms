<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Modules\Catalog\Models\Category;
use Modules\Catalog\Models\Product;
use Modules\CRM\Models\Address;
use Modules\CRM\Models\LoyaltyAccount;
use Modules\CRM\Models\LoyaltyTransaction;
use Modules\CRM\Models\Review;
use Modules\CRM\Services\LoyaltyService;
use Modules\CRM\Services\ReviewService;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

// ── Helpers ───────────────────────────────────────────────────────────────────

function crmUser(): User
{
    return User::create([
        'name'      => 'CRM User',
        'email'     => 'crm-' . uniqid() . '@test.com',
        'password'  => Hash::make('password'),
        'role'      => 'customer',
        'is_active' => true,
    ]);
}

function crmProduct(): Product
{
    $cat = Category::firstOrCreate(['slug' => 'crm-cat'], ['name' => 'CRM Cat']);
    return Product::create([
        'name'        => 'CRM Product ' . uniqid(),
        'slug'        => 'crm-prod-' . uniqid(),
        'sku'         => 'CRM-' . uniqid(),
        'price'       => 50.0,
        'category_id' => $cat->id,
    ]);
}

// ── Review Tests ──────────────────────────────────────────────────────────────

test('customer can submit a review', function () {
    $user    = crmUser();
    $product = crmProduct();
    $service = app(ReviewService::class);

    $review = $service->submitReview($product->id, $user->id, 5, 'Great product!', 'Loved it');

    expect($review)->toBeInstanceOf(Review::class);
    expect($review->rating)->toBe(5);
    expect($review->is_visible)->toBeTrue();
    expect($review->is_flagged)->toBeFalse();
});

test('review rating must be between 1 and 5', function () {
    $user    = crmUser();
    $product = crmProduct();
    $service = app(ReviewService::class);

    expect(fn() => $service->submitReview($product->id, $user->id, 6, 'Bad rating'))
        ->toThrow(Exception::class);
});

test('submitting review twice updates existing review', function () {
    $user    = crmUser();
    $product = crmProduct();
    $service = app(ReviewService::class);

    $service->submitReview($product->id, $user->id, 3, 'Okay');
    $updated = $service->submitReview($product->id, $user->id, 5, 'Changed my mind');

    expect(Review::where('product_id', $product->id)->where('user_id', $user->id)->count())->toBe(1);
    expect($updated->rating)->toBe(5);
});

test('flagging a review hides it', function () {
    $user    = crmUser();
    $product = crmProduct();
    $service = app(ReviewService::class);

    $review = $service->submitReview($product->id, $user->id, 1, 'Spam content');
    $service->flagInappropriateReview($review->id);

    $fresh = $review->fresh();
    expect($fresh->is_flagged)->toBeTrue();
    expect($fresh->is_visible)->toBeFalse();
});

test('recommendations exclude already reviewed products', function () {
    $user     = crmUser();
    $product1 = crmProduct();
    $product2 = crmProduct();
    $service  = app(ReviewService::class);

    // User reviewed product1
    $service->submitReview($product1->id, $user->id, 5, 'Love it');

    // Another user gave product2 a high rating
    $other = crmUser();
    $service->submitReview($product2->id, $other->id, 5, 'Also great');

    $recs = $service->generateRecommendations($user);

    expect($recs)->not->toContain($product1->id);
    expect($recs)->toContain($product2->id);
});

// ── Address Tests ─────────────────────────────────────────────────────────────

test('customer can add an address', function () {
    $user    = crmUser();
    $service = app(ReviewService::class);

    $address = $service->addAddress($user, [
        'type'        => 'home',
        'street'      => '123 Main St',
        'city'        => 'Hanoi',
        'postal_code' => '100000',
        'country'     => 'VN',
        'is_default'  => true,
    ]);

    expect($address)->toBeInstanceOf(Address::class);
    expect($address->is_default)->toBeTrue();
});

test('setting new default address unsets previous default', function () {
    $user    = crmUser();
    $service = app(ReviewService::class);

    $first = $service->addAddress($user, [
        'type' => 'home', 'street' => '1 A St', 'city' => 'HN',
        'postal_code' => '100000', 'country' => 'VN', 'is_default' => true,
    ]);

    $second = $service->addAddress($user, [
        'type' => 'work', 'street' => '2 B St', 'city' => 'HN',
        'postal_code' => '100001', 'country' => 'VN', 'is_default' => true,
    ]);

    expect($first->fresh()->is_default)->toBeFalse();
    expect($second->fresh()->is_default)->toBeTrue();
});

test('getAddressForOrder returns default when no id given', function () {
    $user    = crmUser();
    $service = app(ReviewService::class);

    $service->addAddress($user, [
        'type' => 'home', 'street' => 'Default St', 'city' => 'HN',
        'postal_code' => '100000', 'country' => 'VN', 'is_default' => true,
    ]);

    $address = $service->getAddressForOrder($user);
    expect($address)->not->toBeNull();
    expect($address->is_default)->toBeTrue();
});

// ── Loyalty Tier Tests ────────────────────────────────────────────────────────

test('bronze tier is default for new account', function () {
    $user    = crmUser();
    $service = app(LoyaltyService::class);

    $account = $service->getOrCreateAccount($user);
    expect($account->tier)->toBe('bronze');
    expect($account->points)->toBe(0);
});

test('tier upgrades to silver at 500 points', function () {
    $user    = crmUser();
    $service = app(LoyaltyService::class);

    $service->awardPoints($user, 500, 'purchase');

    $account = LoyaltyAccount::where('user_id', $user->id)->first();
    expect($account->tier)->toBe('silver');
});

test('tier upgrades to gold at 1500 points', function () {
    $user    = crmUser();
    $service = app(LoyaltyService::class);

    $service->awardPoints($user, 1500, 'purchase');

    expect(LoyaltyAccount::where('user_id', $user->id)->value('tier'))->toBe('gold');
});

test('tier upgrades to platinum at 5000 points', function () {
    $user    = crmUser();
    $service = app(LoyaltyService::class);

    $service->awardPoints($user, 5000, 'purchase');

    expect(LoyaltyAccount::where('user_id', $user->id)->value('tier'))->toBe('platinum');
});

test('earn transaction is logged when points awarded', function () {
    $user    = crmUser();
    $service = app(LoyaltyService::class);

    $service->awardPoints($user, 100, 'order #1', 1);

    $account = LoyaltyAccount::where('user_id', $user->id)->first();
    $tx      = LoyaltyTransaction::where('loyalty_account_id', $account->id)->first();

    expect($tx->type)->toBe('earn');
    expect($tx->points)->toBe(100);
    expect($tx->reference_id)->toBe(1);
});

test('redeem transaction is logged when points redeemed', function () {
    $user    = crmUser();
    $service = app(LoyaltyService::class);

    $service->awardPoints($user, 300, 'purchase');
    $service->redeemPoints($user, 100);

    $account = LoyaltyAccount::where('user_id', $user->id)->first();
    $tx      = LoyaltyTransaction::where('loyalty_account_id', $account->id)
        ->where('type', 'redeem')->first();

    expect($tx)->not->toBeNull();
    expect($tx->points)->toBe(-100);
});

test('getCustomerBenefits returns correct tier config', function () {
    $user    = crmUser();
    $service = app(LoyaltyService::class);

    $service->awardPoints($user, 1500, 'purchase');
    $benefits = $service->getCustomerBenefits($user);

    expect($benefits['tier'])->toBe('gold');
    expect($benefits['multiplier'])->toBe(2.0);
    expect($benefits['discount_pct'])->toBe(5.0);
    expect($benefits['free_shipping'])->toBeTrue();
});
