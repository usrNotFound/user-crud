<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserAddressController;

Auth::routes(['reset' => false]);

Route::get('/', [UserController::class, 'edit'])
    ->middleware('auth');

Route::get('my-profile', [UserController::class, 'edit'])
    ->name('users.edit')
    ->middleware('auth');

Route::patch('my-profile', [UserController::class, 'update'])
    ->name('users.update')
    ->middleware('auth');

Route::resource('users/{user}/addresses', UserAddressController::class)
    ->except(['index', 'show'])
    ->middleware('auth');
