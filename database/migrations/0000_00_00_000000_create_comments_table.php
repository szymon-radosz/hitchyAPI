<?php
/** actuallymab | 12.06.2016 - 02:00 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');
            $table->string('body');
            $table->integer('user_id');
            $table->integer('point_id');
            $table->boolean('submittedByAdmin');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('comments');
    }
}
