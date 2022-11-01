<?php

use App\Http\Controllers\DeveloperController;
use App\Http\Controllers\HackathonController;
use App\Http\Controllers\V1\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// TEMPLATE ROUTE
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [AuthController::class, 'authenticate']);
Route::post('register', [AuthController::class, 'register']);
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('get-user', [AuthController::class, 'getUser']);
    Route::get('hackathons', [HackathonController::class, 'list']);
    Route::get('hackathons/{id}', [HackathonController::class, 'show']);
    Route::get('topTenDevelopers', [DeveloperController::class, 'listTopTenDevelopers']);
});