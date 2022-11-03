<?php

namespace App\Http\Controllers;

use App\Models\Hackathon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class HackathonController extends Controller
{
    /**
     * Display a listing of Hackathons based in page and pagesize.
     * This API is the one that fulfills 'retrieve both hackathons with their developers' requirement.
     * @param  \Illuminate\Http\Request  $request
     * @return Hackathon|Collection
     */
    public function list(Request $request)
    {
        $data = $request->only('page', 'pageSize');
        $validator = Validator::make($data, [
            'page' => 'required|integer',
            'pageSize' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->failed()], Response::HTTP_BAD_REQUEST);
        }

        $hackathons = Hackathon::with(['developers'])
            ->orderBy('held_in', 'desc')
            ->offset($data['page'] * $data['pageSize'])
            ->limit($data['pageSize'])
            ->get();
        
        return response()->json($hackathons, Response::HTTP_OK);
    }

    /**
     * Display the specified hackathon, with its developments ordered ascendently by rank.
     *
     * @param  \App\Models\Hackathon  $hackathon
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $hackathon = Hackathon::with([
            'developments' => function ($query) {
                $query->orderBy('rank', 'asc');
            }
        ])->find($id);

        if (!$hackathon) {
            return response()->json([
                'message' => 'Product not found.'
            ], Response::HTTP_NOT_FOUND);
        }

        return $hackathon;
    }
}
