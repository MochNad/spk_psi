<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/logout', [LoginController::class, 'logout']);

Auth::routes();

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/get-users', [DashboardController::class, 'getUsers']);
    Route::post('/add-user', [DashboardController::class, 'addUser']);
    Route::get('/get-user/{id}', [DashboardController::class, 'getUser']);
    Route::post('/update-user/{id}', [DashboardController::class, 'updateUser']);
    Route::post('/delete-user/{id}', [DashboardController::class, 'deleteUser']);

    Route::get('/get-criterias', [DashboardController::class, 'getCriterias']);
    Route::get('/get-alternatives', [DashboardController::class, 'getAlternatives']);
    Route::post('/add-criteria', [DashboardController::class, 'addCriteria']);
    Route::post('/add-alternative', [DashboardController::class, 'addAlternative']);
    Route::get('/get-criteria/{id}', [DashboardController::class, 'getCriteria']);
    Route::get('/get-alternative/{id}', [DashboardController::class, 'getAlternative']);
    Route::post('/update-criteria/{id}', [DashboardController::class, 'updateCriteria']);
    Route::post('/update-alternative/{id}', [DashboardController::class, 'updateAlternative']);
    Route::post('/delete-criteria/{id}', [DashboardController::class, 'deleteCriteria']);
    Route::post('/delete-alternative/{id}', [DashboardController::class, 'deleteAlternative']);

    Route::get('/get-inputs', [DashboardController::class, 'getInputs']);
    Route::post('/save-inputs', [DashboardController::class, 'saveInputs']);

    Route::get('/get-matriks', [DashboardController::class, 'getMatriks']);
});

Route::fallback(function () {
    return redirect('/login');
});
