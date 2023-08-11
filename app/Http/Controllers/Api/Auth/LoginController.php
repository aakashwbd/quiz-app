<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Request;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        try {
            if (!$user = User::where('email', $request->input('email'))->first()) {
                return $this->messageResponse('Sorry, User not found');
            }
            if (!Hash::check($request->input('password'), $user->password)) {
                return $this->messageResponse('Credentials not matched', 400);
            }
            return $this->entityResponse(['token' => 'Bearer ' . $this->tokenGenerate($user, $request), 'role_id' => $user->role_id ], 200, 'success', 'Successfully logged in...');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }



    public function update(Request $request)
    {
        try {
            if (!$user = User::where('id', request()->id)->first()) {
                return $this->messageResponse();
            }
            $user->update(request()->all());
            $token = $this->tokenGenerate($user, request()->all());
            return $this->entityResponse('Bearer ' . $token, 200, 'success', 'User information updated successfully');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    public function tokenGenerate($user, $request)
    {
        $data = collect($user)->only(['id', 'name', 'email', 'role_id'])->toArray();
        return auth()->claims($data)->login($user);
    }



    public function logout()
    {
        try {
            if (!auth()->check()) {
                return $this->messageResponse('Token already expired');
            }

            auth()->logout();
            return $this->messageResponse('Successfully logout...', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
