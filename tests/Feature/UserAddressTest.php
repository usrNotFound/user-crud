<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Address;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

class UserAddressTest extends TestCase
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
    public function it_redirects_to_login_if_the_user_is_not_logged_in()
    {
        auth()->logout();
        $this->get(route('addresses.create', 'asd'))
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function it_returns_successful_when_user_is_logged_in()
    {
        $this->get(route('addresses.create', $this->user))
            ->assertSuccessful();
    }

    /** @test */
    public function it_creates_address_for_user()
    {
        $this->post(route('addresses.store', $this->user), [
            'address_line_1' => '1 Testy Ave',
            'address_line_2' => '',
            'suburb' => 'Testy Vil',
            'state' => 'McTesty',
            'postcode' => 4200,
            'country' => 'Australia',
        ])
            ->assertRedirect(route('users.edit'));

        $this->assertDatabaseHas('addresses', [
            'address_line_1' => '1 Testy Ave',
            'suburb' => 'Testy Vil',
            'state' => 'McTesty',
            'postcode' => 4200,
            'country' => 'Australia',
            'user_id' => $this->user->id,
        ]);
    }

    /** @test */
    public function it_updates_address()
    {
        $address = Address::factory()->create(['user_id' => $this->user->id]);

        $this->patchJson(route('addresses.update', ['user' => $this->user, 'address' => $address]), [
            'address_line_1' => '2 Testy Vill',
            'address_line_2' => '',
            'suburb' => 'Testy Vil',
            'state' => 'McTesty',
            'postcode' => 4302,
            'country' => 'Australia',
        ])
            ->assertRedirect(route('users.edit'));

        $this->assertDatabaseHas('addresses', [
            'address_line_1' => '2 Testy Vill',
            'postcode' => 4302,
            'user_id' => $this->user->id,
        ]);
    }

    /** @test */
    public function it_removes_address_for_a_user()
    {
        $address = Address::factory()->create(['user_id' => $this->user->id]);

        $this->delete(route('addresses.destroy', ['user' => $this->user, 'address' => $address]))
            ->assertRedirect(route('users.edit'));

        $this->assertDatabaseCount('addresses', 0);
    }

    /** @test */
    public function it_validates_address_payload()
    {
        $this->postJson(route('addresses.store', $this->user))
            ->assertJsonValidationErrors(['address_line_1', 'suburb', 'postcode', 'state', 'country']);
    }
}
