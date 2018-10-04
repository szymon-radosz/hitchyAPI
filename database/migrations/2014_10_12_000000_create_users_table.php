<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
          $table->increments('id');
          $table->string('firstName');
          $table->string('lastName');
          $table->string('city');
          $table->string('country');
          $table->text('about');
          $table->integer('age');
          $table->string('nickName')->unique();
          $table->string('email')->unique();
          $table->string('password');
          $table->string('passwordConfirmation');
          $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
