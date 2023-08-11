<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::get('login', fn() => inertia('Auth/Login'))->name('login');
Route::get('register', fn() => inertia('Auth/Register'))->name('register');


/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/
Route::get('', fn() => inertia('Users/Home'))->name('home');
Route::get('profile', fn() => inertia('Users/Profile'))->name('profile');
Route::get('examinations', fn() => inertia('Users/Examination'))->name('examinations');
Route::get('examinations/history', fn() => inertia('Users/History'))->name('examinations.history');


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::get('dashboard', fn() => inertia('Admin/Dashboard'))->name('dashboard');
Route::get('categories', fn() => inertia('Admin/Categories'))->name('categories');
Route::get('questions', fn() => inertia('Admin/Questions'))->name('questions');
Route::get('users', fn() => inertia('Admin/Users'))->name('users');
