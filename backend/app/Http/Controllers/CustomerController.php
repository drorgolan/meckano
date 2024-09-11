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
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'phone' => 'nullable|regex:/^\d+$/|max:20',
            'address' => 'nullable|string|max:20',
        ]);

        $customer = Customer::create($validatedData);

        return response()->json($customer, 201);
    }

    public function show($id)
    {
        $customer = Customer::findOrFail($id);

        return response()->json($customer);
    }

    public function update(Request $request, $id)
    {


        $customer = Customer::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:customers,email,' . $id,
            'phone' => 'nullable|string|max:20',
        ]);

        $customer->update($validatedData);

        return response()->json($customer);
    }

// Search method to handle search requests
    public function search(Request $request)
    {


        // Debug to ensure function is called
       // echo "Function called successfully!";

        // Validate the search query parameter
        $request->validate([
            'query' => 'required|string|max:255' ,
        ]);
      //  echo $request->query('query');
        // Get the search query from the request
        $searchTerm = $request->query('query');



        // Find customers matching the search term in their name, email, or address
        $customers = Customer::where('name', 'like', '%' . $searchTerm . '%')
            ->orWhere('email', 'like', '%' . $searchTerm . '%')
            ->orWhere('address', 'like', '%' . $searchTerm . '%')
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
