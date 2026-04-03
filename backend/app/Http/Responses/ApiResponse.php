<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

/**
 * Standardized API Response Format
 * All API responses should follow this structure
 */
class ApiResponse
{
    /**
     * Success response
     *
     * Structure:
     * {
     *   "success": true,
     *   "message": "Operation successful",
     *   "data": { ... },
     *   "code": 200
     * }
     */
    public static function success($data = null, string $message = 'Success', int $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'code' => $code,
            'timestamp' => now()->toIso8601String(),
        ], $code);
    }

    /**
     * Error response
     *
     * Structure:
     * {
     *   "success": false,
     *   "message": "Error message",
     *   "errors": { ... },
     *   "code": 400
     * }
     */
    public static function error(string $message = 'Error', $errors = null, int $code = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
            'code' => $code,
            'timestamp' => now()->toIso8601String(),
        ], $code);
    }

    /**
     * Validation error response
     */
    public static function validationError($errors, int $code = 422): JsonResponse
    {
        return self::error('Validation failed', $errors, $code);
    }

    /**
     * Not found response
     */
    public static function notFound(string $message = 'Resource not found'): JsonResponse
    {
        return self::error($message, null, 404);
    }

    /**
     * Unauthorized response
     */
    public static function unauthorized(string $message = 'Unauthorized'): JsonResponse
    {
        return self::error($message, null, 401);
    }

    /**
     * Forbidden response
     */
    public static function forbidden(string $message = 'Forbidden'): JsonResponse
    {
        return self::error($message, null, 403);
    }

    /**
     * Server error response
     */
    public static function serverError(string $message = 'Internal server error'): JsonResponse
    {
        return self::error($message, null, 500);
    }

    /**
     * Created response
     */
    public static function created($data, string $message = 'Resource created successfully'): JsonResponse
    {
        return self::success($data, $message, 201);
    }

    /**
     * Paginated response
     */
    public static function paginated($items, string $message = 'Success'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $items->items(),
            'pagination' => [
                'total' => $items->total(),
                'per_page' => $items->perPage(),
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'from' => $items->firstItem(),
                'to' => $items->lastItem(),
            ],
            'code' => 200,
            'timestamp' => now()->toIso8601String(),
        ], 200);
    }
}
