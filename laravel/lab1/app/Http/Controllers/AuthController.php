<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
            'password_confirmation' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $data = $validator->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        $success['token'] = $user->createToken('API TOKEN')->plainTextToken;
        $success['name'] = $user->name;
        return response()->json($success, 201);
        
        
        
        
    }
    
    public function login(Request $request): JsonResponse
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        
        $credentials = $request->only('email', 'password');
        
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $success['token'] = $user->createToken('API TOKEN')->plainTextToken;
            $success['name'] = $user->name;
            return new JsonResponse($success, 200);
        }
        return new JsonResponse(['msg' => 'Invalid credentials'], 401);
        
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
     }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
