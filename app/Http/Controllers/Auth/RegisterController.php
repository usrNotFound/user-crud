<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    use RegistersUsers;

    public function __construct()
    {
        $this->middleware('guest');
    }

    public function showRegistrationForm()
    {
        return Inertia::render('Register/Create');
    }

    public function register(UserRequest $request)
    {
        tap(User::create($request->validated()), function ($user) {
            event(new Registered($user));
            $this->guard()->login($user);
        });

        return redirect()->to('/my-profile');
    }
}
