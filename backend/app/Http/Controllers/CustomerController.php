<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CustomerController
{

    public function index()
    {
        return response()->json(Customer::paginate(5));
    }

    public function store(Request $request)
    {
        // Validate the input data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'phone' => 'nullable|regex:/^\d+$/|max:20',
            'address' => 'nullable|string|max:20',
        ]);

        // Sanitize validated data
        $sanitizedData = $this->sanitizeCustomerData($validatedData);

        // Create the customer
        $customer = Customer::create($sanitizedData);

        return response()->json($customer, 201);
    }

    private function sanitizeCustomerData(array $data): array
    {
        // Sanitize each field
        if (!empty($data['name']))
            $data['name'] = htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8');
        if (!empty($data['email']))
            $data['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        if (!empty($data['phone']))
            $data['phone'] = isset($data['phone']) ? filter_var($data['phone'], FILTER_SANITIZE_NUMBER_INT) : null;
        if (!empty($data['address']))
            $data['address'] = isset($data['address']) ? htmlspecialchars($data['address'], ENT_QUOTES, 'UTF-8') : null;

        return $data;
    }

    public function show($id)
    {
        $customer = Customer::findOrFail($id);

        return response()->json($customer);
    }

    // Update existing customer
    public function update(Request $request, $id)
    {
        // Validate the input data

        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:customers,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:20',
        ]);

        // Sanitize validated data
        $sanitizedData = $this->sanitizeCustomerData($validatedData);

        // Find the customer and update
        $customer = Customer::findOrFail($id);
        $customer->update($sanitizedData);

        return response()->json($customer, 200);
    }

// Search method to handle search requests
    public function search(Request $request)
    {


        // Debug to ensure function is called
        // echo "Function called successfully!";

        // Validate the search query parameter
        $request->validate([
            'query' => 'required|string|max:255',
        ]);
        //  echo $request->query('query');
        // Get the search query from the request
        $searchTerm = $request->query('query');

        $sanitizedQuery = htmlspecialchars($searchTerm, ENT_QUOTES, 'UTF-8');

        // Find customers matching the search term in their name, email, or address
        $customers = Customer::where('name', 'like', '%' . $sanitizedQuery . '%')
            ->orWhere('email', 'like', '%' . $sanitizedQuery . '%')
            ->orWhere('address', 'like', '%' . $sanitizedQuery . '%')
            ->orWhere('phone', 'like', '%' . $sanitizedQuery . '%')
            ->get();

        // Return the search results as JSON
        return response()->json($customers);
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return response()->json(null, 204);
    }
}
