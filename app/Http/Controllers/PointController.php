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
    private $latDifference = 8;
    private $lngDifference = 8;

    public function index()
    {
        $points = Point::with('users')->paginate(3);

        return $points;
    }

    public function getPointsNearCoords(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = Point::with('users')
                        ->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])
                        ->join('point_user', 'points.id', '=', 'point_user.point_id')
                        ->selectRaw('points.*, SUM(point_user.vote) AS sum_of_votes, COUNT(*) AS votes_count')
                        ->groupBy('points.id')
                        ->paginate(3);
        
        return $points;
    }

    public function getTheNewestPoints(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = Point::with('users')->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])->orderByRaw('created_at DESC')->paginate(3);

        return $points;
    }

    public function getTheOldestPoints(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = Point::with('users')->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])->orderByRaw('created_at ASC')->paginate(3);

        return $points;
    }

    public function getTheBestVoted(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = Point::with('users')
                        ->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])
                        ->join('point_user', 'points.id', '=', 'point_user.point_id')
                        ->selectRaw('points.*, SUM(point_user.vote)/COUNT(*) AS average')
                        ->groupBy('points.id')
                        ->orderBy('average', 'desc')
                        ->paginate(3);

        return $points;
    }

    public function getTheWorstVoted(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = Point::with('users')
                        ->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])
                        ->join('point_user', 'points.id', '=', 'point_user.point_id')
                        ->selectRaw('points.*, SUM(point_user.vote)/COUNT(*) AS average')
                        ->groupBy('points.id')
                        ->orderBy('average', 'asc')
                        ->paginate(3);

        return $points;
    }

    public function getTheMostTimeVoted(Request $request)
    {
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $points = Point::with('users')
                        ->where([['lattitude', '>', $minLat], ['longitude', '>', $minLng], ['lattitude', '<', $maxLat], ['longitude', '<', $maxLng]])
                        ->join('point_user', 'points.id', '=', 'point_user.point_id')
                        ->selectRaw('points.*, COUNT(*) AS count')
                        ->groupBy('points.id')
                        ->orderBy('count', 'desc')
                        ->paginate(3);

        return $points;
    }

    public function store(Request $request)
    {
        $point = new Point;

        $point->name = $request->name;
        $point->description = $request->description;
        $point->lattitude = $request->lattitude;
        $point->longitude = $request->longitude;
        $point->user_id = $request->user_id;

        $point->save();

        $vote = $request->vote;

        $saveVote = Point::find($point->id);
        $saveVote->users()->attach(1, ['point_id' => $point->id, 'user_id' => $point->user_id, 'vote' => $vote]);

        return $point;
    }

    public function addPointVote(Request $request){
        $user_id = $request->userId;
        $point_id = $request->pointId;
        $vote = $request->vote;

        $saveVote = Point::find($point_id);
        return $saveVote->users()->attach(1, ['point_id' => $point_id, 'user_id' => $user_id, 'vote' => $vote]);
    }
}
