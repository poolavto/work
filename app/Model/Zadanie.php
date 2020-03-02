<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Zadanie extends Model
{
    protected $fillable = ['name', 'description', 'status', 'otlozheno_do'];
}
