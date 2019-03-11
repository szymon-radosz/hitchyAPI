<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use App\Comment;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Response;
use DB;

class UserController extends Controller
{
    public function index()
    {
        $allUsers = DB::table('users')->get();
        return $allUsers;
    }

    public function login(Request $request){
        $nickName = $request->emailOrNickname;
        $password = $request->password;

        $user = User::where('nickName', $nickName)->orWhere('email', $nickName)->first();
        if($user){
            
            $passwordMatched = Hash::check($request->password, $user->password);
            
            if($passwordMatched === true){
                
                $userId = $user->id;
                $userNickName = $user->nickName;
                $userEmail = $user->email;

                $userInfo = (object) ['userId' => $userId, 'userNickName' => $nickName, 'userEmail' => $userEmail];
    
                return Response::json($userInfo);
            }else{
                return Response::json(["error" => "Nie można znaleźć użytkownika"]);
            }
        }
        return Response::json(["error" => "Nie można znaleźć użytkownika"]);
        
    }

    public function store(Request $request)
    {
        try{
            $user = new User;
            $user->firstName = $request->firstName;
            $user->lastName = $request->lastName;
            $user->about = $request->about;
            $user->age = $request->age;
            $user->nickName = $request->nickName;
            $user->city = $request->city;
            $user->country = $request->country;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
           
            $user->save();
    
            $userInfo = (object) ['userId' => $user->id, 'userNickName' => $user->nickName];

            return Response::json($userInfo);
        }catch(\Exception $e) {
            return $e->getMessage();
        }
    }

    public function findUserEventsHistory(Request $request){
        $id = $request->id;

        $userData = DB::table('event_user')->where('user_id', $id)
        ->join('events', 'events.id', '=', 'event_user.event_id')
        ->join('users', 'users.id', '=', 'event_user.user_id')
        ->select('events.title', 'events.created_at', 'users.nickName')
        ->get();

        return $userData;
    }
}
