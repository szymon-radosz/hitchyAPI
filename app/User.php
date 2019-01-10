<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name', 'firstName', 'lastName', 'city', 'country', 'about', 'email', 'password', 'photo'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function events()
    {
        return $this->belongsToMany('App\Event', 'event_user', 
        'event_id', 'user_id');
    }

    function comments() {

        return $this->hasMany('App\Comment');
    }
}
