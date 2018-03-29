<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $comment = new Comment;

        $comment->body = $request->input('commentBody');
        $comment->user_id = $request->user_id;
        $comment->point_id = $request->point_id;
        $comment->submittedByAdmin = false;

        $comment->save();
    }
}
