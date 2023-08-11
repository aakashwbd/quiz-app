<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examination extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'questions',
        'given_answers',
        'results',
    ];

    protected $casts = [
        'questions' => 'array',
        'given_answers' => 'array',
        'results' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
