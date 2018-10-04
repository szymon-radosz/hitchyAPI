<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

/*Route::group(['middleware' => ['api','cors']], function () {
    Route::post('auth/register', 'Auth\RegisterController@create');
});*/

//Route::post('register', 'API\PassportController@register');
//Route::post('login', 'API\PassportController@login');

/*Route::group(['middleware' => 'auth:api'], function(){
	Route::post('get-details', 'API\PassportController@getDetails');
});*/

Route::get('users','UserController@index');
Route::post('login', 'UserController@login');
Route::get('user/{id}','UserController@findById');
Route::delete('user/{id}','UserController@destroy');
Route::put('user','UserController@store');
Route::post('user','UserController@store');

//points list
Route::get('points', 'PointController@index');

//single point
Route::get('point/{id}', 'PointController@show');

//create new point
Route::post('point', 'PointController@store');

//delete point
Route::delete('point/{id}', 'PointController@destroy');

//users list
Route::get('users', 'UserController@index');

//send request to api to submit post with id
Route::post('/adminSubmit/{id}', ['uses' =>'AdminController@submitPoint']);

//send request to api to submit event with id
Route::post('/adminEventSubmit/{id}', ['uses' =>'AdminController@submitEvent']);

Route::post('comment', 'CommentController@store');
Route::get('comments', 'CommentController@index');

Route::get('events', 'EventController@index');
Route::post('events', 'EventController@store');
Route::get('allEvents', 'EventController@allEvents');

Route::get('events/{id}', array('uses' => 'EventController@show'));

Route::post('eventComments', 'EventCommentsController@store');
Route::get('eventComments', 'EventCommentsController@index');
Route::get('eventComments/{id}', array('uses' => 'EventCommentsController@commentsForID'));
