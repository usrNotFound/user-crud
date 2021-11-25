<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RegisterController extends Controller
{
    use RegistersUsers;

    public function showRegistrationForm()
    {

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
