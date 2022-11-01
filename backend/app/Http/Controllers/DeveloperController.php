<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use Illuminate\Database\Eloquent\Collection;

class DeveloperController extends Controller
{
    /**
     * Display a listing of Top 10 Developers.
     * @return Developer|Collection
     */
    public function listTopTenDevelopers()
    {
        return Developer::orderBy('total_points', 'desc')
            ->limit(10)
            ->get();
    }
}
