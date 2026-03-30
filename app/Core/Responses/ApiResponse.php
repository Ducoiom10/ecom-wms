<?php

namespace App\Core\Responses;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    /**
     * Định dạng trả về JSON chuẩn cho toàn bộ API
     */
    public function successResponse($data, $message = "Success", $code = 200): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    public function errorResponse($message, $code): JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => null
        ], $code);
    }

    
}
