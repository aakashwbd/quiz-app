<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [App\Http\Controllers\Api\Auth\RegisterController::class, 'register']);
Route::post('login', [App\Http\Controllers\Api\Auth\LoginController::class, 'login']);
Route::patch('update-profile', [App\Http\Controllers\Api\Auth\LoginController::class, 'update']);
Route::post('logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);

Route::apiResource('categories', App\Http\Controllers\Api\CategoryController::class)->except('create', 'edit');
Route::get('questions/{category_id}',[App\Http\Controllers\Api\QuestionController::class, 'fetchByCategoyId']);
Route::apiResource('questions', App\Http\Controllers\Api\QuestionController::class)->except('create', 'edit');
Route::post('examinations', [App\Http\Controllers\Api\ExaminationController::class, 'store']);
Route::get('examinations/result', [App\Http\Controllers\Api\ExaminationController::class, 'fetchResults']);
Route::get('summaries', [App\Http\Controllers\Api\SummaryController::class, 'summary']);


Route::apiResource('users', App\Http\Controllers\Api\UserController::class)->except('create', 'edit');
