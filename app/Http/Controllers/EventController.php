<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\User;
use DB;

class EventController extends Controller
{
    private $latDifference = 8;
    private $lngDifference = 8;

    public function index(Request $request){
        $minLat = $request->lattitude - $this->latDifference;
        $minLng = $request->longitude - $this->lngDifference;

        $maxLat = $request->lattitude + $this->latDifference;
        $maxLng = $request->longitude + $this->lngDifference;

        $events = Event::with('users')
                        ->where([['startPlaceLattitude', '>', $minLat], ['startPlaceLongitude', '>', $minLng], ['stopPlaceLattitude', '<', $maxLat], ['stopPlaceLongitude', '<', $maxLng]])
                        ->orderBy('created_at', 'desc')
                        ->paginate(3);
        return $events;
    }

    public function showEventById($id){
        $event = Event::with('users', 'comments')->where('id', $id)->get();

        return $event;
    }

    public function store(Request $request)
    {
        $userId = $request->user_id;

        $event = new Event;

        $event->title = $request->title;
        $event->description = $request->description;
        $event->startPlaceLattitude = $request->startPlaceLattitude;
        $event->startPlaceLongitude = $request->startPlaceLongitude;
        $event->stopPlaceLattitude = $request->stopPlaceLattitude;
        $event->stopPlaceLongitude = $request->stopPlaceLongitude;
        $event->startDate = $request->startDate;
        $event->limit = $request->limit;

        $event->save();

        $matchUserWithEvent = Event::find($event->id);
        $matchUserWithEvent->users()->attach($userId);

        return $event;
    }

    public function addEventUserRelation(Request $request){
        $userId = $request->userId;
        $eventId = $request->eventId;

        $matchUserWithEvent = Event::find($eventId);

        return $matchUserWithEvent->users()->attach($userId);
    }

    public function removeEventUserRelation(Request $request){
        $userId = $request->userId;
        $eventId = $request->eventId;

        $matchUserWithEvent = Event::find($eventId);
        
        return $matchUserWithEvent->users()->detach($userId);
    }
}
