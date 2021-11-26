<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Address;
use App\Http\Requests\UserAddressRequest;

class UserAddressController extends Controller
{
    public function create(User $user)
    {
        return Inertia::render('Addresses/Create', [
            'user' => $user,
        ]);
    }

    public function store(User $user, UserAddressRequest $request)
    {
        $user->addresses()->saveMany(collect([$request->validated()])->mapInto(Address::class));

        return redirect()
            ->to(route('users.edit'));
    }

    public function edit(User $user, Address $address)
    {
        return Inertia::render('Addresses/Edit', [
            'user' => $user,
            'address' => $address,
        ]);
    }

    public function update(User $user, Address $address, UserAddressRequest $request)
    {
        $address->update($request->validated());

        return redirect()
            ->to(route('users.edit'));
    }

    public function destroy(User $user, Address $address)
    {
        $address->delete();

        return redirect()
            ->to(route('users.edit'));
    }
}
