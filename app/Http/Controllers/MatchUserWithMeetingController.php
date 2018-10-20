<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MatchUserWithMeeting;
use DB;

class MatchUserWithMeetingController extends Controller
{
    public function store(Request $request)
    {
        $match = new MatchUserWithMeeting;

        $match->userId = $request->userId;
        $match->eventId = $request->eventId;

        $match->save();
    }
}
