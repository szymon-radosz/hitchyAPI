<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use DB;

class CommentController extends Controller
{
    public function index(){
        $comments = DB::table('comments')->get();

        return $comments;
    }

    public function store(Request $request)
    {
        $comment = new Comment;

        $comment->comment_body = $request->input('commentBody');
        $comment->user_id = $request->userId;
        $comment->user_email = $request->userEmail;
        $comment->event_id = $request->eventId;

        $comment->save();

        return $comment;
    }
}
