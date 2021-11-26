<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserAddressRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }


    public function rules()
    {
        return [
            'address_line_1' => ['required'],
            'address_line_2' => ['sometimes'],
            'suburb' => ['required'],
            'state' => ['required'],
            'postcode' => ['required'],
            'country' => ['required'],
        ];
    }
}
