<?php

namespace App\Rules;

use libphonenumber\PhoneNumberUtil;
use Illuminate\Contracts\Validation\Rule;

class PhoneValidator implements Rule
{
    private PhoneNumberUtil $phoneNumberUtil;

    public function __construct(PhoneNumberUtil $phoneNumberUtil)
    {
        $this->phoneNumberUtil = $phoneNumberUtil;
    }


    public function passes($attribute, $value)
    {
        return rescue(
            fn() => $this->phoneNumberUtil->isValidNumberForRegion(
                $this->phoneNumberUtil->parse($value, 'AU'),
                'AU'
            ), false, false
        );
    }


    public function message()
    {
        return 'Phone number is not valid';
    }
}
