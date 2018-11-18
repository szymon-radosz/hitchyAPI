<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use DB;

class EventController extends Controller
{
    public function index(){
        $events = DB::table('events')->orderBy('created_at', 'desc')->paginate(3);

        return $events;
    }

    public function showEventById($id){
        $event = DB::table('events')->where('id', $id)->get();

        return $event;
    }

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
}
