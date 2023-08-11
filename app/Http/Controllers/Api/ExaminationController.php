<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExaminationRequest;
use App\Models\Examination;
use App\Models\Question;
use Illuminate\Http\Request;

class ExaminationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function fetchResults()
    {
        try {

            $query = Examination::query()
            ->where(['id' => request()->input('exam_id')])
            ->orWhere(['user_id' => request()->input('user_id')])
            ->first();
            return $query;
        } catch (\Exception $e) {
            return $this->serverError($e);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $inputs = request()->all();
            $data = $inputs['data'];
            $questionIds = collect($data)->pluck('id');

            $questionMap = Question::whereIn('id', $questionIds)->get()->keyBy('id');

            $result = collect($data)->reduce(function ($carry, $item) use ($questionMap) {
                $actualAnswer = $questionMap->get($item['id'])->answer;
                $carry[$actualAnswer === $item['answer'] ? 'right' : 'wrong']++;
                return $carry;
            }, ['right' => 0, 'wrong' => 0]);

            $stored = [
                "user_id" => $inputs['user_id'],
                "questions" => $questionMap,
                "given_answers" => $inputs['data'],
                "results" => $result,
            ];

            if ($query = Examination::query()->create($stored)) {
                return $this->entityResponse(["result" => $result, "exam_id" => $query['id']], 201, 'success' ,'Examination added successfully');
            }
        } catch (\Exception $e) {
            return $this->serverError($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
