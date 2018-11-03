<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MatchUserWithMeeting;
use DB;

class MatchUserWithMeetingController extends Controller
{
    public function index(){
        $allUsers = DB::table('match_user_with_event')->get();
        
        return $allUsers;
    }
    public function store(Request $request)
    {
        $match = new MatchUserWithMeeting;

        $match->userId = $request->userId;
        $match->eventId = $request->eventId;

        $match->save();
    }
}
