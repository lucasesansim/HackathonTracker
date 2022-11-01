<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Development extends Model
{
    use HasFactory;
    protected $guarded = [];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    public function hackathon() {
        return $this->belongsTo(Hackathon::class);
    }

    public function developer() {
        return $this->belongsTo(Developer::class);
    }
}
