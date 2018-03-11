<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Point;
use App\Http\Resources\Point as PointResource;

class PointController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //return all point 127.0.0.1:8000/api/points
        return PointResource::collection(Point::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $point = new Point;

        $point->id = $request->input('point_id');
        $point->name = $request->input('name');
        $point->description = $request->input('description');
        $point->lattitude = $request->input('lattitude');
        $point->longitude = $request->input('longitude');
        $point->ratingNumVotes = 1;
        $point->safetyNumVotes = 1;
        $point->safetySumVotes = $request->input('safetySumVotes');
        $point->ratingSumVotes = $request->input('ratingSumVotes');
        $point->submittedByAdmin = false;

        if($point->save()){
            return new PointResource($point);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $point = Point::findOrFail($id);

        return new PointResource($point);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $point = Point::findOrFail($id);

        if($point->delete()){
            return new PointResource($point);
        }
    }
}
