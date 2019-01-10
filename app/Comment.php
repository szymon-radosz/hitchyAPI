<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    function events(){

        return $this->belongsTo('App/Event');
    }
    
    function users(){
    
        return $this->belongsTo('App/User');
    }
}
