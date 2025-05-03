<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostApiController;
use App\Http\Middleware\AuthMiddleware;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/posts', [PostApiController::class, 'store'])->middleware(AuthMiddleware::class);
Route::get('/posts', [PostApiController::class, 'index'])->middleware(AuthMiddleware::class);
Route::get('/posts/{id}', [PostApiController::class, 'show'])->middleware(AuthMiddleware::class);
Route::put('/posts/{id}', [PostApiController::class, 'update'])->middleware(AuthMiddleware::class);
Route::delete('/posts/{id}', [PostApiController::class, 'destroy'])->middleware(AuthMiddleware::class);
