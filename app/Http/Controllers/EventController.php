<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use DB;

class EventController extends Controller
{
    public function index(){

        //return only unique events when author of event and joined user are the same, e.g. events creted by user
        $events = DB::table('events')->whereColumn('author', 'joinedUser')->get();

        return $events;
    }

    public function allEvents(){

        $events = DB::table('events')->get();

        return $events;
    }

    public function store(Request $request)
    {
        $event = new Event;

        $event->name = $request->input('name');
        $event->description = $request->input('description');
        $event->startPlaceLattitude = $request->input('startPlaceLattitude');
        $event->startPlaceLongitude = $request->input('startPlaceLongitude');
        $event->stopPlaceLattitude = $request->input('stopPlaceLattitude');
        $event->stopPlaceLongitude = $request->input('stopPlaceLongitude');
        $event->startDate = $request->input('startDate');
        $event->author = $request->author;
        $event->joinedUser = $request->joinedUser;
        $event->submittedByAdmin = false;

        $event->save();
    }
}
