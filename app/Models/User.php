<?php

namespace App\Models;

use Illuminate\Support\Arr;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function setPasswordAttribute($password)
    {
        return $this->attributes['password'] = Hash::needsRehash($password)
            ? Hash::make($password)
            : $password;
    }

    public function updateWithAddresses($attributes)
    {
        $this->update(Arr::except($attributes, 'addresses'));

        if (Arr::has($attributes, 'addresses')) {
            $this->createAddresses(collect($attributes['addresses']));
        }
        return $this;
    }

    public function createAddresses(Collection $addresses)
    {
        return $this->addresses()->saveMany($addresses->mapInto(Address::class));
    }
}
