<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'   => "Admin",
            'email'        => 'admin@admin.com',
            'password'     => '123456',
            'role_id'      => 1
        ]);

        User::factory()->count(100)->create();
    }
}
