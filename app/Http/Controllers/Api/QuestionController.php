<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuestionRequest;
use App\Models\Question;
use Exception;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $offset = request()->input('offset') ?? 10;
            $fields = ['id', 'category_id', 'question', 'options', 'answer', 'status'];
            $with   = ['category:id,name'];
            $query = Question::query();
            $condition = [];
            if (count($condition)) {
                $query = $query->where($condition);
            }
            $quesitons = $this->paginate($query->with($with)->select($fields)->paginate($offset)->toArray());
            return $this->entityResponse($quesitons);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(QuestionRequest $request)
    {
        try {
            if (Question::query()->create($request->validated())) {
                return $this->messageResponse('Question added successfully', 201, 'success');
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
            $fields = ['id', 'category_id', 'question', 'options', 'answer', 'status'];
            $with   = ['category:id,name'];
            if (!$quesiton = Question::query()->with($with)->select($fields)->where(['id' => $id])->first()) {
                return $this->messageResponse();
            }
            return $this->entityResponse($quesiton);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function fetchByCategoyId(string $id)
    {
        try {
            $fields = ['id', 'question', 'options'];
            if (!$quesiton = Question::query()->select($fields)->where(['category_id' => $id])->get()) {
                return $this->messageResponse();
            }
            return $this->entityResponse($quesiton);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(QuestionRequest $request, string $id)
    {
        try {
            $fields = ["id"];
            if (!$quesiton = Question::query()->select($fields)->where(['id' => $id])->first()) {
                return $this->messageResponse();
            }
            $quesiton->update($request->validated());
            return $this->messageResponse('Question updated successfully', 200, 'success');
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
            if (!$quesiton = Question::query()->select($fields)->where(['id' => $id])->first()) {
                return $this->messageResponse();
            }
            $quesiton->delete();
            return $this->messageResponse('Quesition deleted successfully', 200, 'success');
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
