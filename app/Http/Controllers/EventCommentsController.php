<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\eventComment;
use DB;

class EventCommentsController extends Controller
{
    public function index(){
        $comments = DB::table('event_comments')->get();

        return $comments;
    }

    public function store(Request $request)
    {
        $comment = new eventComment;

        $comment->body = $request->input('commentBody');
        $comment->user_id = $request->user_id;
        $comment->user_email = $request->user_email;
        $comment->event_id = $request->event_id;
        $comment->submittedByAdmin = false;

        $comment->save();
    }

    //get all events by event id
    public function commentsForID($id){
        $eventComments = DB::table('event_comments')->where('event_id', $id)->get();

        return $eventComments;
    }
}
