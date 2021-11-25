<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    public function edit()
    {
        return Inertia::render('Users/Edit', [
            'user' => auth()->user()->load('addresses'),
        ]);
    }

    public function update(UserRequest $request)
    {
        auth()->user()
            ->update($request->validated());

        return redirect()->route('users.edit');
    }
}
