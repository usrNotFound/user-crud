<?php

namespace App\Http\Requests;

use App\Rules\PhoneValidator;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    private bool $phoneProcessingFailed = false;

    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $required = $this->method() === 'POST' ? 'required' : 'sometimes';

        return [
            'first_name' => ['required'],
            'last_name' => ['required'],
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($this->user())],
            'phone' => ['sometimes', app(PhoneValidator::class), fn() => !$this->phoneProcessingFailed],
            'password' => [$required, 'confirmed'],
            'addresses' => ['sometimes', 'array'],
            'addresses.*.address_line_1' => ['sometimes'],
            'addresses.*.address_line_2' => ['sometimes'],
            'addresses.*.suburb' => ['required_with:addresses.*.address_line_1'],
            'addresses.*.state' => ['required_with:addresses.*.address_line_1'],
            'addresses.*.postcode' => ['required_with:addresses.*.address_line_1'],
            'addresses.*.country' => ['required_with:addresses.*.address_line_1'],
        ];
    }

    public function prepareForValidation()
    {
        if ($this->has('phone')) {
            rescue(
                fn() => $this->merge(['phone' => phone($this->phone, 'AU')->formatE164()]),
                fn() => $this->phoneProcessingFailed = true,
                false
            );
        }
    }
}
