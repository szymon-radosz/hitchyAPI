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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//points list
Route::get('points', 'PointController@index');

//single point
Route::get('point/{id}', 'PointController@show');

//create new point
Route::post('point', 'PointController@store');

//delete point
Route::delete('point/{id}', 'PointController@destroy');
