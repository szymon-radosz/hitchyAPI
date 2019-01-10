<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function users()
    {
        return $this->belongsToMany('App\User', 'event_user', 
        'event_id', 'user_id');
    }

    function comments() {

        return $this->hasMany('App\Comment');
    }
}
