<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('posts', [PostController::class, 'index']);
Route::get('posts/index', [PostController::class, 'index']);
Route::get("posts/create", [PostController::class, 'create']);
Route::post("posts/store", [PostController::class, 'store']);
Route::get('posts/{id}', [PostController::class, 'show']);
Route::get('posts/{id}/edit', [PostController::class, 'edit']);
Route::put('posts/{id}/update', [PostController::class, 'update']);
Route::delete('posts/{id}/delete', [PostController::class, 'destroy']);
Route::fallback(function () {
    return "bad request";
    });