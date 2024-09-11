<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class CustomerRouteTest extends TestCase
{
    use RefreshDatabase;

    private $token;

    // This function runs before every test in this class
    protected function setUp(): void
    {
        parent::setUp();
        $this->loginAndGetToken();
    }

    // Function to login and store the bearer token
    private function loginAndGetToken()
    {
        // Register a user first
        $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => 'password123',
            'confirm_password' => 'password123', // Corrected field name
        ])->assertStatus(200); // Assert the registration was successful

        // Login with the registered user
        $response = $this->postJson('/api/login', [
            'email' => 'testuser@example.com',
            'password' => 'password123',
        ]);

        // Save the token for future requests
        $this->token = $response->json('access_token');
    }

    // Helper function to get headers with bearer token
    private function getHeaders()
    {
        return [
            'Authorization' => 'Bearer ' . $this->token,
        ];
    }

    public function test_can_get_customers()
    {
        $response = $this->getJson('/api/customers', $this->getHeaders());

        $response->assertStatus(200);
    }

    public function test_can_create_customer()
    {
        $response = $this->postJson('/api/customers', [
            'name' => 'New Customer',
            'email' => 'newcustomer@example.com',
            'phone_number' => '051425252',
            'address' => '123 Main St',
        ], $this->getHeaders());

        $response->assertStatus(201);
    }

//    public function test_can_show_customer()
//    {
//        $customer = $this->postJson('/api/customers', [
//            'name' => 'Customer to Show',
//            'email' => 'showcustomer@example.com',
//        ], $this->getHeaders())->json();
//
//        $response = $this->getJson("/api/customers/{$customer['id']}", $this->getHeaders());
//
//        $response->assertStatus(200);
//    }

    public function test_can_update_customer()
    {
        $customer = $this->postJson('/api/customers', [
            'name' => 'Customer to Update',
            'email' => 'newcustomer@example.com',
            'address' => 'Shugidugi st.',
        ], $this->getHeaders())->json();

        $response = $this->putJson("/api/customers/{$customer['id']}", [
            'name' => 'Updated Customer',
        ], $this->getHeaders());

        $response->assertStatus(200);
    }

    public function test_can_delete_customer()
    {
        // Create a customer
        $response = $this->postJson('/api/customers', [
            'name' => 'Customer to Delete',
            'email'  => 'newcustomer@example.com'
        ], $this->getHeaders());

        // Check the response and debug the output
        $response->assertStatus(201);
        $responseData = $response->json();

        // Output the response data for debugging
        dump($responseData);

        // Check that the response contains the `id`
        $this->assertArrayHasKey('id', $responseData);

        // Delete the customer
        $response = $this->deleteJson("/api/customers/{$responseData['id']}", [], $this->getHeaders());

        $response->assertStatus(204);
    }

    public function test_can_search_customer()
    {
        // Create a customer to search
        $this->postJson('/api/customers', [
            'name' => 'Searchable Customer',
            'email' => 'search@example.com',
        ], $this->getHeaders());

        $response = $this->getJson('/api/customers/search?query=Searchable', $this->getHeaders());

        $response->assertStatus(200);
    }
}
