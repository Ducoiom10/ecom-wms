<?php

namespace Modules\CRM\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\CRM\Services\LoyaltyService;
use Modules\CRM\Services\ReviewService;

class CRMController extends Controller
{
    public function __construct(
        private ReviewService  $reviewService,
        private LoyaltyService $loyaltyService,
    ) {}

    // ── Reviews ──────────────────────────────────────────────────

    public function submitReview(Request $request): JsonResponse
    {
        $data = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'rating'     => 'required|integer|min:1|max:5',
            'content'    => 'required|string|max:2000',
            'title'      => 'nullable|string|max:200',
        ]);

        $review = $this->reviewService->submitReview(
            $data['product_id'],
            $request->user()->id,
            $data['rating'],
            $data['content'],
            $data['title'] ?? null,
        );

        return response()->json($review, 201);
    }

    public function flagReview(int $reviewId): JsonResponse
    {
        $this->reviewService->flagInappropriateReview($reviewId);
        return response()->json(['message' => 'Review flagged.']);
    }

    public function recommendations(Request $request): JsonResponse
    {
        $productIds = $this->reviewService->generateRecommendations($request->user());
        return response()->json(['product_ids' => $productIds]);
    }

    // ── Addresses ────────────────────────────────────────────────

    public function listAddresses(Request $request): JsonResponse
    {
        return response()->json($request->user()->addresses()->get());
    }

    public function addAddress(Request $request): JsonResponse
    {
        $data = $request->validate([
            'type'        => 'required|in:home,work,other',
            'street'      => 'required|string|max:255',
            'city'        => 'required|string|max:100',
            'state'       => 'nullable|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country'     => 'required|string|max:5',
            'is_default'  => 'boolean',
        ]);

        $address = $this->reviewService->addAddress($request->user(), $data);
        return response()->json($address, 201);
    }

    // ── Loyalty ──────────────────────────────────────────────────

    public function loyaltyBenefits(Request $request): JsonResponse
    {
        return response()->json(
            $this->loyaltyService->getCustomerBenefits($request->user())
        );
    }

    public function redeemPoints(Request $request): JsonResponse
    {
        $data = $request->validate(['points' => 'required|integer|min:1']);

        $discount = $this->loyaltyService->redeemPoints($request->user(), $data['points']);
        return response()->json(['discount' => $discount]);
    }
}
