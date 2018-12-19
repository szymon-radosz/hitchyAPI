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
    private $latDifference = 1;
    private $lngDifference = 1;

    public function index()
    {
        $points = DB::table('points')->paginate(3);

        foreach($points as $point){
            if($point->amount_of_votes > 0){
                $point->rating = (int)$point->sum_of_votes/$point->amount_of_votes;
            }else{
                $point->rating = 0;
            }
        }

        return $points;
    }

    public function getPointsNearCoords(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = DB::table('points')->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])->paginate(3);

        if(count($points) > 0){
            foreach($points as $point){
                if($point->amount_of_votes > 0){
                    $point->rating = (int)$point->sum_of_votes/$point->amount_of_votes;
                }else{
                    $point->rating = 0;
                }
            }
        }
        
        return $points;
    }

    public function getTheNewestPoints(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = DB::table('points')->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])->orderByRaw('created_at DESC')->paginate(3);

        foreach($points as $point){
            if($point->amount_of_votes > 0){
                $point->rating = (int)$point->sum_of_votes/$point->amount_of_votes;
            }else{
                $point->rating = 0;
            }
        }
        return $points;
    }

    public function getTheOldestPoints(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = DB::table('points')->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])->orderByRaw('created_at ASC')->paginate(3);

        foreach($points as $point){
            if($point->amount_of_votes > 0){
                $point->rating = (int)$point->sum_of_votes/$point->amount_of_votes;
            }else{
                $point->rating = 0;
            }
        }
        return $points;
    }

    public function getTheBestVoted(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = DB::table('points')->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])->orderByRaw('sum_of_votes/amount_of_votes DESC')->paginate(3);

        foreach($points as $point){
            if($point->amount_of_votes > 0){
                $point->rating = (int)$point->sum_of_votes/$point->amount_of_votes;
            }else{
                $point->rating = 0;
            }
        }
        return $points;
    }

    public function getTheWorstVoted(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = DB::table('points')->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])->orderByRaw('sum_of_votes/amount_of_votes ASC')->paginate(3);

        foreach($points as $point){
            if($point->amount_of_votes > 0){
                $point->rating = (int)$point->sum_of_votes/$point->amount_of_votes;
            }else{
                $point->rating = 0;
            }
        }
        return $points;
    }

    public function getTheMostTimeVoted(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = DB::table('points')->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])->orderBy('amount_of_votes', 'desc')->paginate(3);

        foreach($points as $point){
            if($point->amount_of_votes > 0){
                $point->rating = (int)$point->sum_of_votes/$point->amount_of_votes;
            }else{
                $point->rating = 0;
            }
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

        $point = Point::find($vote->spot_id);

        $point->sum_of_votes = $point->sum_of_votes + (int)$request->vote_value;
        $point->amount_of_votes = $point->amount_of_votes + 1;

        $point->save();

        return $vote;
    }

    public function checkIfUserVoteExists(Request $request){
        $user_id = $request->user_id;
        $point_id = $request->point_id;
        
        $exist = DB::table('spot_votes')->where([['user_id', $user_id],['spot_id',$point_id]])->get();

        if(count($exist) > 0){
            return 1;
        }else{
            return 0;
        }
    }
}
