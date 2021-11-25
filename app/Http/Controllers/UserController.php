<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    public function edit()
    {

    }

    public function update(UserRequest $request)
    {
        auth()->user()
            ->updateWithAddresses($request->validated());

        return redirect()->route('users.edit');
    }
}
