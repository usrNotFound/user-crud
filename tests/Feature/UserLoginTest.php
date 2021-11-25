<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

class UserLoginTest extends TestCase
{
    use LazilyRefreshDatabase;

    /** @test */
    public function it_returns_successful_status()
    {
        $this->get(route('login'))
            ->assertSuccessful();
    }

    /** @test */
    public function it_logs_in_user()
    {
        $user = User::factory()
            ->create(['email' => 'user@email.com']);

        $this->postJson(route('login'), [
            'email' => 'user@email.com',
            'password' => 'password',
        ]);
        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function it_will_redirect_a_user_to_profile_update_upon_successful_login()
    {
        User::factory()
            ->create(['email' => 'user@email.com']);

        $this->postJson(route('login'), [
            'email' => 'user@email.com',
            'password' => 'password',
        ])
            ->assertRedirect(route('users.edit'));
    }

    /**
     * @test
     * @dataProvider loginValidation
     */
    public function it_validates_login_payload($payload, $errors)
    {
        $this->postJson(route('login'), $payload)
            ->assertJsonValidationErrors($errors);
    }

    public function loginValidation()
    {
        return [
            'Invalid Email' => [['email' => 'invalid@email.com', 'password' => 'password'], ['email']],
            'Invalid Password' => [['email' => 'user@email.com', 'password' => 'invalid-password'], ['email']],
        ];
    }
}
