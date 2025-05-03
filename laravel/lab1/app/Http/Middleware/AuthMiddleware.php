<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\PersonalAccessToken;

class AuthMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken(); 
        
        if (!$token) {
            return response()->json(['error' => 'Token missing.'], 401);
        }

        $accessToken = PersonalAccessToken::findToken($token);
        
        if (!$accessToken) {
            return response()->json(['error' => 'Invalid token.'], 401);
        }

        auth()->login($accessToken->tokenable);

        return $next($request);
    }
}