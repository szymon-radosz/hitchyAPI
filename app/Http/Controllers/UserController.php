<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
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

        $user = DB::table('users')->where('nickName', $nickName)->orWhere('email', $nickName)->first();

        $passwordMatched = Hash::check($request->password, $user->password);

        if($passwordMatched){
            $userId = $user->id;
            $userNickName = $user->nickName;
            $userEmail = $user->email;
        }else{
            $userId = null;
            $userNickName = null;
        }

        $userInfo = (object) ['userId' => $userId, 'userNickName' => $nickName, 'userEmail' => $userEmail];

        return Response::json($userInfo);
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

    public function findById($id)
    {
        $singleUser = DB::table('users')->where('id', $id)->get();
        return $singleUser;
    }
}
