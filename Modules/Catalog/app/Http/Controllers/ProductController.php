<?php

namespace Modules\Catalog\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use App\Proxies\ProductProxy;

class ProductController extends Controller
{
    public function __construct(private ProductProxy $proxy) {}

    public function show(int $id)
    {
        $details = $this->proxy->getDetails($id);

        if (!$details) {
            return ApiResponse::error('Không tìm thấy sản phẩm', null, 404);
        }

        return ApiResponse::success($details->toArray());
    }
}
