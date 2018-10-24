<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Point;
use App\SpotVote;
use DB;
use App\Http\Resources\Point as PointResource;

class PointController extends Controller
{
    public function index()
    {
        $points = DB::table('points')->get();

        foreach($points as $point){
            $sumOfVotes = DB::table('spot_votes')->where('spot_id', $point->id)->sum('vote_value');
            $countVotes = DB::table('spot_votes')->where('spot_id', $point->id)->get();
            $point->sumOfVotes = (int)$sumOfVotes;
            $point->countVotes = count($countVotes);
        }

        return $points;
    }

    public function store(Request $request)
    {
        $point = new Point;

        $point->name = $request->name;
        $point->description = $request->description;
        $point->lattitude = $request->lattitude;
        $point->longitude = $request->longitude;
        $point->authorNickName = $request->authorNickName;

        $point->save();

        return $point;
    }

    public function saveVote(Request $request){
        $vote = new SpotVote;

        $vote->spot_id = (int)$request->spot_id ? (int)$request->spot_id : "";
        $vote->user_id = (int)$request->user_id ? (int)$request->user_id : "";
        $vote->vote_value = (int)$request->vote_value ? (int)$request->vote_value : "";

        $vote->save();

        return $vote;
    }

    public function checkIfUserVoteExists(Request $request){
        $user_id = $request->user_id;
        $point_id = $request->point_id;
        
        $exist = DB::table('spot_votes')->where([['user_id', $user_id],['spot_id',$point_id]])->get();

        //var_dump($exist);

        if(count($exist) > 0){
            return 1;
        }else{
            return 0;
        }
    }
}
