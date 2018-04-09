<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class AdminController extends Controller
{
    public function submitPoint($id)
    {
        //update sumbittedByAdmin column of points table
        $updatedPost = DB::table('points')
             ->where('id','=', $id)
             ->increment('submittedByAdmin');
    }

    public function submitEvent($id)
    {
        //update sumbittedByAdmin column of points table
        $updatedPost = DB::table('events')
             ->where('id','=', $id)
             ->increment('submittedByAdmin');
    }
}
