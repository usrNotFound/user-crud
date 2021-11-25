<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function showLoginForm()
    {

    }

    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);

        return redirect()->route('users.edit');
    }
}
