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

    public function matchUserWithMeeting($id){

        $deleteMatch = matchUserWithMeeting::find($id);

        var_dump($id);
        var_dump($deleteMatch);

        $deleteMatch->delete();
        //$allUsers = DB::table('match_user_with_event')->where('id', $id)->delete();
    }

    public function checkIfUserTakePartInMeeting(Request $request){
        $userId = intval($request->userId);
        $meetingId = $request->meetingId;

        $checkIfUserTakePartInMeeting = DB::table('match_user_with_event')->where([['userId', '=', $userId], ['eventId', '=', $meetingId]])->count();
        //var_dump($checkIfUserTakePartInMeeting);

        if($checkIfUserTakePartInMeeting > 0){
            return 1;
        }else{
            return 0;
        }
    }
}
