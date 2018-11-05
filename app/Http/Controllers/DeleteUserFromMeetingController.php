<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DeleteUserFromMeeting;
use DB;

class DeleteUserFromMeetingController extends Controller
{
    public function index($meetingId){
        $usersIds = DB::table('delete_user_from_meeting')->where('eventId', $meetingId)->get(['userId']);
        $emailsUsersWhichResigned = array();

        foreach($usersIds as $id){
            $userEmail = DB::table('users')->where('id', $id->userId)->get(['email']);
            array_push($emailsUsersWhichResigned, $userEmail);
        }

        return $emailsUsersWhichResigned;
    }

    public function deleteUserFromMeeting(Request $request){
        $deleteUserFromMeeting = new DeleteUserFromMeeting;

        $deleteUserFromMeeting->userId = $request->userId;
        $deleteUserFromMeeting->eventId = $request->meetingId;

        $deleteUserFromMeeting->save();
    }
}
