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

        $comment->commentBody = $request->input('commentBody');
        $comment->userId = $request->userId;
        $comment->userEmail = $request->userEmail;
        $comment->meetingId = $request->meetingId;

        $comment->save();

        return $comment;
    }
}
