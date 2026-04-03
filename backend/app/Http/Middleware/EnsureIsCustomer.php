<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware to check if user is authenticated as customer
 */
class EnsureIsCustomer
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
                'code' => 401,
            ], 401);
        }

        if (auth()->user()->role !== 'customer') {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden - Customer access required',
                'code' => 403,
            ], 403);
        }

        return $next($request);
    }
}
