<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hackathon extends Model
{
    use HasFactory;
    
    public function developers() {
        return $this->belongsToMany(Developer::class, 'developer_hackathon', 'hackathon_id', 'developer_id');
    }

    public function developments() {
        return $this->hasMany(Development::class);
    }
}
