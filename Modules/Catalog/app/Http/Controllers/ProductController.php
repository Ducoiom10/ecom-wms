<?php

namespace Modules\Catalog\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Modules\Catalog\Models\Brand;
use Modules\Catalog\Models\Category;
use Modules\Catalog\Models\Product;
use Modules\Catalog\Repositories\ProductRepository;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(private ProductRepository $repo) {}

    // GET /api/catalog/v1/products
    public function index(Request $request)
    {
        $query = Product::where('is_active', true)
            ->with(['category', 'brand', 'productImages']);

        if ($request->filled('category')) {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }

        if ($request->filled('brand')) {
            $ids = explode(',', $request->brand);
            $query->whereIn('brand_id', $ids);
        }

        if ($request->filled('price')) {
            [$min, $max] = explode('-', $request->price) + [0, PHP_INT_MAX];
            $query->whereBetween('price', [(int)$min, (int)$max]);
        }

        $sort = match($request->sort) {
            'price-asc'  => ['price', 'asc'],
            'price-desc' => ['price', 'desc'],
            'popular'    => ['id', 'desc'],
            default      => ['created_at', 'desc'],
        };

        $products = $query->orderBy(...$sort)->paginate(12);

        return ApiResponse::success($products);
    }

    // GET /api/catalog/v1/products/{id}
    public function show(int $id)
    {
        $product = $this->repo->findWithRelations($id);

        if (!$product) {
            return ApiResponse::error('Không tìm thấy sản phẩm', null, 404);
        }

        return ApiResponse::success($product->toArray());
    }

    // GET /api/catalog/v1/products/search?q=...
    public function search(Request $request)
    {
        $request->validate(['q' => 'required|string|min:2']);

        $results = $this->repo->search($request->q);

        return ApiResponse::success($results->take($request->integer('limit', 20)));
    }

    // GET /api/catalog/v1/products/{id}/related
    public function related(int $id)
    {
        $product = Product::findOrFail($id);

        $related = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $id)
            ->where('is_active', true)
            ->with(['productImages'])
            ->limit(4)
            ->get();

        return ApiResponse::success($related);
    }

    // GET /api/catalog/v1/filters
    public function filters()
    {
        return ApiResponse::success([
            'brands'     => Brand::where('is_active', true)->select('id', 'name')->get(),
            'categories' => Category::where('is_active', true)->select('id', 'name', 'slug')->get(),
        ]);
    }
}
