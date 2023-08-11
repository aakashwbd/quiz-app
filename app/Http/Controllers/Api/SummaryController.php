<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Question;
use App\Models\User;
use Exception;

class SummaryController extends Controller
{
    public function summary()
    {
        try {
            $data = [
                "users" => User::count(),
                "categories" => Category::count(),
                "questions" => Question::count()
            ];
            return $this->entityResponse($data);
        } catch (Exception $e) {
            return $this->serverError($e);
        }
    }
}
