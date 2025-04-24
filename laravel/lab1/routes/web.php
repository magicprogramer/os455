<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
Route::get('posts', [PostController::class, 'index'])->name('posts.index');
Route::get("posts/create", [PostController::class, 'create'])->name('posts.create');
Route::post("posts", [PostController::class, 'store'])->name('posts.store');
Route::get('posts/{post}/show', [PostController::class, 'show'])->name('posts.show')->whereNumber('post');
Route::get('posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit')->whereNumber('post');;
Route::put('posts/{post}/', [PostController::class, 'update'])->name('posts.update')->whereNumber('post');
Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy')->whereNumber('post');;
Route::fallback(function () {
    return "bad request";
    });