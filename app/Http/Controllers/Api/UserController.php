<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $offset = request()->input('offset') ?? 10;
            $fields = ['id', 'name', 'email', "role_id", 'status'];
            $users = User::select($fields)->paginate($offset)->toArray();
            return $this->entityResponse($users);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        try {
            if (User::query()->create($request->validated())) {
                return $this->messageResponse('User added successfully', 201, 'success');
            }
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $fields = ['id', 'name', 'email', "role_id", 'status'];
            $with = [];
            if (!$user = User::query()->with($with)->select($fields)->where(['id' => $id])->first()) {
                return $this->messageResponse();
            }
            return $this->entityResponse($user);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, $id)
    {
        try {
            $fields = ["id"];
            if (!$user = User::query()->select($fields)->where(['id' => $id])->first()) {
                return $this->messageResponse();
            }
            $user->update($request->validated());
            return $this->messageResponse('User updated successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $fields = ['id'];
            if (!$user = User::query()->select($fields)->where(['id' => $id])->first()) {
                return $this->messageResponse();
            }
            $user->delete();
            return $this->messageResponse('User deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
