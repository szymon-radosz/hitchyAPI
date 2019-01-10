<?php

use Illuminate\Http\Request;

Route::get('users','UserController@index');
Route::post('login', 'UserController@login');
Route::get('user/{id}','UserController@findById');
Route::delete('user/{id}','UserController@destroy');
Route::put('user','UserController@store');
Route::post('user','UserController@store');
Route::post('findUserEventsHistory','UserController@findUserEventsHistory');

Route::get('points', 'PointController@index');
Route::get('getPointsNearCoords/{lattitude}/{longitude}', 'PointController@getPointsNearCoords');
Route::get('getTheOldestPoints/{lattitude}/{longitude}', 'PointController@getTheOldestPoints');
Route::get('getTheNewestPoints/{lattitude}/{longitude}', 'PointController@getTheNewestPoints');
Route::get('getTheBestVoted/{lattitude}/{longitude}', 'PointController@getTheBestVoted');
Route::get('getTheMostTimeVoted/{lattitude}/{longitude}', 'PointController@getTheMostTimeVoted');
Route::get('getTheWorstVoted/{lattitude}/{longitude}', 'PointController@getTheWorstVoted');

Route::get('point/{id}', 'PointController@show');
Route::post('point', 'PointController@store');
Route::delete('point/{id}', 'PointController@destroy');
Route::post('saveVote', 'PointController@saveVote');
Route::post('checkIfUserVoteExists', 'PointController@checkIfUserVoteExists');
Route::post('addPointVote', 'PointController@addPointVote');

Route::post('comment', 'CommentController@store');
Route::get('comments', 'CommentController@index');

Route::get('events/{lattitude}/{longitude}', 'EventController@index');
Route::post('events', 'EventController@store');
Route::get('events/{id}', 'EventController@showEventById');
Route::post('addEventUserRelation', 'EventController@addEventUserRelation');
Route::post('removeEventUserRelation', 'EventController@removeEventUserRelation');



