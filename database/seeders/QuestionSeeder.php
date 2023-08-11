<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $payloads = [
            [
                "category_id" => '1',
                "question" => "HTML stands for -",
                "options" => [
                   "HighText Machine Language",
                   "HyperText and links Markup Language",
                   "HyperText Markup Language",
                   "None of these"
                ],
                "answer" => "HyperText Markup Language"
            ],
            [
                "category_id" => '1',
                "question" => "The correct sequence of HTML tags for starting a webpage is -",
                "options" => [
                   "Head, Title, HTML, body",
                   "HTML, Body, Title, Head",
                   "HTML, Head, Title, Body",
                   "HTML, Head, Title, Body"
                ],
                "answer" => "HTML, Head, Title, Body"
            ],
        ];
        foreach ($payloads as $item) {
            Question::create($item);
        }
    }
}
