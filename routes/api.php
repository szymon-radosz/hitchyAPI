<?php

use Illuminate\Http\Request;

Route::get('users','UserController@index');
Route::post('login', 'UserController@login');
Route::get('user/{id}','UserController@findById');
Route::delete('user/{id}','UserController@destroy');
Route::put('user','UserController@store');
Route::post('user','UserController@store');

Route::get('points', 'PointController@index');
Route::get('getTheNewestPoints', 'PointController@getTheNewestPoints');
Route::get('getTheOldestPoints', 'PointController@getTheOldestPoints');
Route::get('point/{id}', 'PointController@show');
Route::post('point', 'PointController@store');
Route::delete('point/{id}', 'PointController@destroy');
Route::post('saveVote', 'PointController@saveVote');
Route::post('checkIfUserVoteExists', 'PointController@checkIfUserVoteExists');

Route::post('comment', 'CommentController@store');
Route::get('comments', 'CommentController@index');

Route::get('events', 'EventController@index');
Route::post('events', 'EventController@store');
Route::get('allEvents', 'EventController@allEvents');
Route::get('events/{id}', 'EventController@showEventById');

Route::post('eventComments', 'EventCommentsController@store');
Route::get('eventComments', 'EventCommentsController@index');
Route::get('eventComments/{id}', array('uses' => 'EventCommentsController@commentsForID'));

Route::post('matchUserWithMeeting', 'MatchUserWithMeetingController@store');

