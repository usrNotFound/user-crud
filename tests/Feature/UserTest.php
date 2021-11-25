<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

class UserTest extends TestCase
{
    use LazilyRefreshDatabase;

    private $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()
            ->create();

        $this->actingAs($this->user);
    }

    /** @test */
    public function it_redirects_to_login_when_a_user_is_not_logged_in()
    {
        auth()->logout();

        $this->get(route('users.edit'))
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function it_shows_update_user_details_when_logged_in()
    {
        $this->get(route('users.edit'))
            ->assertSuccessful();
    }

    /** @test */
    public function it_updates_user_information()
    {
        $this->patchJson(route('users.update', $this->user), [
            'first_name' => 'UpdatedFirst',
            'last_name' => 'UpdatedLast',
            'email' => $this->user->email,
            'phone' => $this->user->phone,
        ])->assertRedirect(route('users.edit'));

        $this->assertDatabaseCount('users', 1)
            ->assertDatabaseHas('users', [
                'first_name' => 'UpdatedFirst',
                'last_name' => 'UpdatedLast',
            ]);
    }

    /** @test */
    public function it_adds_61_prefix_to_phone_number_and_removes_space_while_saving()
    {
        $this->patchJson(route('users.update', $this->user), array_merge(
            $this->user->only('first_name', 'last_name', 'email', 'phone'),
            ['phone' => '(04) 0504 2040']
        ));

        $this->assertDatabaseHas('users', [
            'phone' => '+61405042040',
            'email' => $this->user->email,
        ]);
    }

    /**
     * @test
     * @dataProvider userUpdateValidation
     */
    public function it_validates_the_user_registration_payload($payload, $errors)
    {
        $this->patchJson(route('users.update', $this->user), array_merge(
            $this->user->only('first_name', 'last_name', 'email', 'phone'),
            $payload
        ))
            ->assertJsonValidationErrors($errors);
    }

    /** @test */
    public function it_store_address()
    {
        $this->patchJson(route('users.update', $this->user), array_merge(
            $this->user->only('first_name', 'last_name', 'email', 'phone'),
            [
                'addresses' => [
                    [
                        'address_line_1' => '1 Testy Ave',
                        'address_line_2' => '',
                        'suburb' => 'Testy Vil',
                        'state' => 'McTesty',
                        'postcode' => 4200,
                        'country' => 'Australia',
                    ],
                ],
            ]
        ))->assertRedirect();

        $this->assertDatabaseHas('addresses', [
            'user_id' => $this->user->id,
            'address_line_1' => '1 Testy Ave',
            'address_line_2' => null,
            'suburb' => 'Testy Vil',
            'state' => 'McTesty',
            'postcode' => 4200,
            'country' => 'Australia',
        ]);
    }

    /** @test */
    public function it_validates_addresses()
    {
        $this->patchJson(route('users.update', $this->user), array_merge(
            $this->user->only('first_name', 'last_name', 'email', 'phone'),
            [
                'addresses' => [
                    [
                        'address_line_1' => '1 Testy Ave',
                    ],
                ],
            ]
        ))->assertJsonValidationErrors([
            'addresses.0.suburb',
            'addresses.0.state',
            'addresses.0.postcode',
            'addresses.0.country',
        ]);
    }

    public function userUpdateValidation()
    {
        return [
            'Empty first and last name' => [['first_name' => null, 'last_name' => null], ['first_name', 'last_name']],
            'Invalid Phone' => [['phone' => '042342'], ['phone']],
            'Invalid Email' => [['email' => 'invalid-email'], ['email']],
        ];
    }
}
