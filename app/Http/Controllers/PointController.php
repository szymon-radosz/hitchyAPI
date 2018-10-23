<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Point;
use DB;
use App\Http\Resources\Point as PointResource;

class PointController extends Controller
{
    public function index()
    {
        //return all point 127.0.0.1:8000/api/points
        //return PointResource::collection(Point::all());

        $points = DB::table('points')->get();

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

    public function show($id)
    {
        $point = Point::findOrFail($id);

        return new PointResource($point);
    }

    public function destroy($id)
    {
        $point = Point::findOrFail($id);

        if($point->delete()){
            return new PointResource($point);
        }
    }
}
