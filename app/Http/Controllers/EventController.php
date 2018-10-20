<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use DB;

class EventController extends Controller
{
    public function index(){

        //return only unique events when author of event and joined user are the same, e.g. events creted by user
        //$events = DB::table('events')->whereColumn('author', 'joinedUser')->get();

        $events = DB::table('events')->get();

        return $events;
    }

    public function showEventById($id){
        $event = DB::table('events')->where('id', $id)->get();

        return $event;
    }

    //return all events
    public function allEvents(){

        $events = DB::table('events')->get();

        return $events;
    }

    //save event
    public function store(Request $request)
    {
        $event = new Event;

        $event->title = $request->title;
        $event->description = $request->description;
        $event->startPlaceLattitude = $request->startPlaceLattitude;
        $event->startPlaceLongitude = $request->startPlaceLongitude;
        $event->stopPlaceLattitude = $request->stopPlaceLattitude;
        $event->stopPlaceLongitude = $request->stopPlaceLongitude;
        $event->startDate = $request->startDate;
        $event->authorNickName = $request->authorNickName;
        $event->limit = $request->limit;

        $event->save();

        return $event;
    }

    public function matchUserWithMeeting(Request $request){

    }

    //return single event
    public function show($id){
        $event = Event::find($id);

        return $event;
    }
}
