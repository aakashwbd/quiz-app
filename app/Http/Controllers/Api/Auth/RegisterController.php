<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Exception;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            if (User::query()->create($request->validated())) {
                return $this->messageResponse('Successfully registered...', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
