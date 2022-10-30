<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    use HasFactory;

    public function hackathons() {
        return $this->belongsToMany(Hackaton::class, 'developer_hackathon', 'developer_id', 'hackathon_id');
    }

    public function developments() {
        return $this->hasMany(Development::class);
    }
}
