<?php

namespace Tests\Unit;

use App\Rules\PhoneValidator;
use Tests\TestCase;

class PhoneNumberTest extends TestCase
{
    /**
     * @test
     * @dataProvider validPhoneNumbers
     */
    public function it_returns_true_if_phone_number_is_valid($phoneNumber)
    {
        $this->assertTrue(
            $this->app['validator']
                ->make(['phone' => $phoneNumber], ['phone' => [app(PhoneValidator::class)]])
                ->passes()
        );
    }

    /** @test */
    public function it_returns_false_if_phone_number_is_invalid()
    {
        // test phone number
        $this->assertTrue(
            $this->app['validator']
                ->make(['phone' => '7777777'], ['phone' => [app(PhoneValidator::class)]])
                ->fails()
        );

        $this->assertTrue(
            $this->app['validator']
                ->make(['phone' => 'abc'], ['phone' => [app(PhoneValidator::class)]])
                ->fails()
        );
    }

    public function validPhoneNumbers()
    {
        return [
            '0405042040' => ['0405442044', true],
            '04 0504 2040' => ['04 5504 2940', true],
            '(04) 0504 2040' => ['(04) 0574 2040', true],
            '04 050 420 40' => ['04 050 429 40', true],
            '+61405042040' => ['+61405042130', true],
            '+610405042040' => ['+610405056040', true],
        ];
    }
}
