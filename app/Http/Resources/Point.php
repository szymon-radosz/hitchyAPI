<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Point extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'lattitude' => $this->lattitude,
            'longitude' => $this->longitude,
            'ratingNumVotes' => $this->ratingNumVotes,
            'safetyNumVotes' => $this->safetyNumVotes,
            'ratingSumVotes' => $this->ratingSumVotes,
            'safetySumVotes' => $this->safetySumVotes,
            'submittedByAdmin' => $this->submittedByAdmin
        ];
    }
}
