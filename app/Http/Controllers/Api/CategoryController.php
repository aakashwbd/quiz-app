<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Exception;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $offset = request()->input('offset') ?? 10;
            $fields = ['id', 'name', 'status'];
            $with = [];
            $query = Category::query();
            $condition = [];
            if (count($condition)) {
                $query = $query->where($condition);
            }
            $categories = $this->paginate($query->with($with)->select($fields)->paginate($offset)->toArray());
            return $this->entityResponse($categories);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        try {
            if (Category::query()->create($request->validated())) {
                return $this->messageResponse('Category added successfully', 201, 'success');
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
            $fields = ["id", 'name', 'status'];
            $with = [];
            if (!$category = Category::query()->with($with)->select($fields)->where(['id' => $id])->first()) {
                return $this->messageResponse();
            }
            return $this->entityResponse($category);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, $id)
    {
        try {
            $fields = ["id"];
            if (!$category = Category::query()->select($fields)->where(['id' => $id])->first()) {
                return $this->messageResponse();
            }
            $category->update($request->validated());
            return $this->messageResponse('Category updated successfully', 200, 'success');
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
            if (!$category = Category::query()->select($fields)->where(['id' => $id])->first()) {
                return $this->messageResponse();
            }
            $category->delete();
            return $this->messageResponse('Category deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
