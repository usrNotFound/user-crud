<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

class UserRegisterTest extends TestCase
{
    use LazilyRefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Event::fake();
    }

    /** @test */
    public function it_loads_registration_page()
    {
        $this->get(route('register'))
            ->assertSuccessful();
    }

    /** @test */
    public function it_registers_a_user()
    {
        $this->makeRequest()
            ->assertRedirect('/my-profile');

        $this->assertDatabaseHas('users', [
            'first_name' => 'first',
            'last_name' => 'last',
            'email' => 'email@test.com',
        ]);
    }

    /** @test */
    public function it_validates_that_the_email_is_unique()
    {
        User::factory()
            ->create(['email' => 'email@test.com']);

        $this->postJson(route('register'), [
            'first_name' => 'first',
            'last_name' => 'last',
            'email' => 'email@test.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertInvalid(['email' => 'The email has already been taken.']);
    }

    /**
     * @test
     * @dataProvider registrationValidation
     */
    public function it_validates_the_user_registration_payload($payload, $errors)
    {
        User::factory()
            ->create(['email' => 'email@email.com']);

        $this->postJson(route('register'), $payload)
            ->assertInvalid($errors);
    }

    /** @test */
    public function it_sends_user_register_event_once_registration_is_completed()
    {
        $this->makeRequest()
            ->assertRedirect();

        Event::assertDispatched(Registered::class);
    }

    public function registrationValidation()
    {
        return [
            'Required' => [[], ['first_name', 'last_name', 'email', 'password']],
            'Password Confirmation' => [['password' => 123, 'password_confirmation' => 12], ['password']],
            'Invalid Email' => [['email' => 'Invalid Email'], ['email']],
            'Email Already Exists' => [['email' => 'email@email.com'], ['email']],
        ];
    }

    public function makeRequest()
    {
        return $this->postJson(route('register'), [
            'first_name' => 'first',
            'last_name' => 'last',
            'email' => 'email@test.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);
    }
}
