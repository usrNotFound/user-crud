<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Auth::routes(['reset' => false]);

Route::get('my-profile', [UserController::class, 'edit'])
    ->name('users.edit')
    ->middleware('auth');

Route::patch('my-profile', [UserController::class, 'update'])
    ->name('users.update')
    ->middleware('auth');
