<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PostController;
Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
Route::get('posts', [PostController::class, 'index'])->name('posts.index');
Route::get("posts/create", [PostController::class, 'create'])->name('posts.create')->middleware('auth');
Route::post("posts", [PostController::class, 'store'])->name('posts.store')->middleware('auth');
Route::get('posts/{post}/show', [PostController::class, 'show'])->name('posts.show')->whereNumber('post')->middleware('auth');
Route::get('posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit')->whereNumber('post')->middleware('auth');
Route::put('posts/{post}/', [PostController::class, 'update'])->name('posts.update')->whereNumber('post')->middleware('auth');
Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy')->whereNumber('post')->middleware('auth');
Route::fallback(function () {
    return "bad request";
    });