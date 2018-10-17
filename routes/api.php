<?php

use Illuminate\Http\Request;

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

Route::post('comment', 'CommentController@store');
Route::get('comments', 'CommentController@index');

Route::get('events', 'EventController@index');
Route::post('events', 'EventController@store');
Route::get('allEvents', 'EventController@allEvents');

Route::get('events/{id}', array('uses' => 'EventController@show'));

Route::post('eventComments', 'EventCommentsController@store');
Route::get('eventComments', 'EventCommentsController@index');
Route::get('eventComments/{id}', array('uses' => 'EventCommentsController@commentsForID'));
