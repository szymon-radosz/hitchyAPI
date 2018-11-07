<?php

use Illuminate\Http\Request;

Route::get('users','UserController@index');
Route::post('login', 'UserController@login');
Route::get('user/{id}','UserController@findById');
Route::delete('user/{id}','UserController@destroy');
Route::put('user','UserController@store');
Route::post('user','UserController@store');

Route::get('points', 'PointController@index');
Route::get('getTheOldestPoints', 'PointController@getTheOldestPoints');
Route::get('getTheBestVoted', 'PointController@getTheBestVoted');
Route::get('getTheMostTimeVoted', 'PointController@getTheMostTimeVoted');
Route::get('getTheWorstVoted', 'PointController@getTheWorstVoted');

Route::get('point/{id}', 'PointController@show');
Route::post('point', 'PointController@store');
Route::delete('point/{id}', 'PointController@destroy');
Route::post('saveVote', 'PointController@saveVote');
Route::post('checkIfUserVoteExists', 'PointController@checkIfUserVoteExists');

Route::post('comment', 'CommentController@store');
Route::get('comments', 'CommentController@index');

Route::get('events', 'EventController@index');
Route::post('events', 'EventController@store');
Route::get('events/{id}', 'EventController@showEventById');

Route::post('eventComments', 'EventCommentsController@store');
Route::get('eventComments', 'EventCommentsController@index');
Route::get('eventComments/{id}', array('uses' => 'EventCommentsController@commentsForID'));

Route::post('matchUserWithMeeting', 'MatchUserWithMeetingController@store');
Route::get('matchUserWithMeetings', 'MatchUserWithMeetingController@index');
Route::delete('deleteMatchUserWithMeeting/{id}', 'MatchUserWithMeetingController@matchUserWithMeeting');

Route::get('deleteUserFromMeeting/{meetingId}', 'DeleteUserFromMeetingController@index');
Route::post('deleteUserFromMeeting', 'DeleteUserFromMeetingController@deleteUserFromMeeting');



