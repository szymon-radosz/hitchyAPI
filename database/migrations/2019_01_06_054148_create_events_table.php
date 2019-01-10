<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');

            $table->string('title');
            $table->text('description');
            $table->double('startPlaceLattitude');
            $table->double('startPlaceLongitude');
            $table->double('stopPlaceLattitude');
            $table->double('stopPlaceLongitude');
            $table->date('startDate');
            $table->string('limit');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
