<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Point extends Model
{
    public function users()
    {
        return $this->belongsToMany('App\User')
        ->withPivot('vote')
    	->withTimestamps();
    }
}
