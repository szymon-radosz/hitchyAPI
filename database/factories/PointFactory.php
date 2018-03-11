<?php

use Faker\Generator as Faker;

$factory->define(App\Point::class, function (Faker $faker) {
    return [
        'name' => $faker->text(50),
        'description' => $faker->text(200),
        'lattitude' => $faker->latitude(45,55),
        'longitude' => $faker->longitude(15,2),
        'ratingNumVotes' => $faker->numberBetween(30,30),
        'safetyNumVotes' => $faker->numberBetween(30,30),
        'ratingSumVotes' => $faker->randomFloat(2,1,150),
        'safetySumVotes' => $faker->randomFloat(2,1,150),
        'submittedByAdmin' => $faker->boolean()
    ];
});
