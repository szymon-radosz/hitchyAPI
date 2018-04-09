<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventCommentsTable extends Migration
{
    public function up()
    {
        Schema::create('event_comments', function (Blueprint $table) {
            $table->increments('id');
            $table->string('body');
            $table->string('user_email');
            $table->integer('user_id');
            $table->integer('event_id');
            $table->boolean('submittedByAdmin');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('event_comments');
    }
}
