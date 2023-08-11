<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payloads = [
            [
                "name" => "HTML",
                "status" => "active"
            ],
            [
                "name" => "CSS",
                "status" => "active"
            ],
            [
                "name" => "PHP",
                "status" => "active"
            ],
            [
                "name" => "Laravel",
                "status" => "active"
            ],
            [
                "name" => "JavaScript",
                "status" => "active"
            ],
            [
                "name" => "React JS",
                "status" => "active"
            ],
            [
                "name" => "jQuery",
                "status" => "active"
            ],
            [
                "name" => "OOP Programming",
                "status" => "active"
            ],
            [
                "name" => "Data Structure",
                "status" => "active"
            ],
            [
                "name" => "Algorithms",
                "status" => "active"
            ],
            [
                "name" => "Data Science",
                "status" => "active"
            ],
        ];
        foreach ($payloads as $item) {
            Category::create($item);
        }
    }
}
