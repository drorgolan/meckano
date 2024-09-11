<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // Registration
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'confirm_password' => 'required|string|min:8|same:password',
        ]);

        // Sanitize validated data
        $sanitized = $this->sanitizeRegistrationData($validated);

        $user = User::create([
            'name' => $sanitized['name'],
            'email' => $sanitized['email'],
            'password' => Hash::make($sanitized['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }

    // Login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Sanitize credentials
        $sanitizedCredentials = $this->sanitizeLoginData($credentials);

        if (!Auth::attempt($sanitizedCredentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }

    // Logout
    public function logout()
    {
        $user = Auth::user();
        $token_count = $user->tokens()->count();
        Log::info('Token count before deletion: ' . $token_count);
        $user->tokens()->delete();
        $token_count = $user->tokens()->count();
        Log::info('Token count after deletion: ' . $token_count);

        return response()->json(['message' => 'Successfully logged out', 'Tokens count' => $token_count]);
    }

    private function sanitizeRegistrationData(array $data): array
    {
        // Sanitize each field
        $data['name'] = htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8');
        $data['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        // Passwords are not sanitized; they should be hashed before storage
        return $data;
    }

    private function sanitizeLoginData(array $data): array
    {
        // Sanitize email
        $data['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        // Passwords are not sanitized; they should be handled securely
        return $data;
    }
}
