<?php

namespace Modules\Catalog\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Catalog\Models\Product;

class ProductController extends Controller
{
    public function show($id)
    {
        // Sử dụng Eager Loading để lấy dữ liệu liên quan
        $product = Product::with([
            'category',
            'stocks.location.warehouse'
        ])->find($id);

        if (!$product) {
            return $this->errorResponse('Không tìm thấy sản phẩm', 404);
        }

        $data = [
            'product_info' => $product,
            'total_available_stock' => $product->available_stock,
        ];

        return $this->successResponse($data, 'Lấy thông tin sản phẩm thành công');
    }
}
