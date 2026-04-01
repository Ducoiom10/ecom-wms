<?php

namespace App\Http\Middleware;

use App\Http\Responses\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        $user = auth()->user();

        if (!$user) {
            return ApiResponse::unauthorized();
        }

        if (!$user->isActive()) {
            return ApiResponse::forbidden('Your account is inactive.');
        }

        // Load roles with permissions in one query (cached by Eloquent within request)
        $user->loadMissing('roles.permissions');

        if (!$user->hasPermission($permission)) {
            return ApiResponse::forbidden("Missing permission: {$permission}");
        }

        return $next($request);
    }
}
