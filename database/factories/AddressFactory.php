<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'address_line_1' => $this->faker->streetAddress,
            'address_line_2' => null,
            'state' => 'QLD',
            'suburb' => $this->faker->city,
            'country' => $this->faker->country,
            'postcode' => $this->faker->postcode
        ];
    }
}
