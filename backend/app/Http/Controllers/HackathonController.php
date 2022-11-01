<?php

namespace App\Http\Controllers;

use App\Models\Hackathon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class HackathonController extends Controller
{
    // protected $user;
    // public function __construct(Request $request)
    // {
    //     $token = $request->header('Authorization');
    //     if($token != '')
    //         //En caso de que requiera autentifiación la ruta obtenemos el usuario y lo almacenamos en una variable, nosotros no lo utilizaremos.
    //         $this->user = JWTAuth::parseToken()->authenticate();
    // }

    /**
     * Display a listing of Hackathons based in page and pagesize.
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

        // TODO: check if needs to manually include the developments its related to
        return Hackathon::orderBy('held_in', 'desc')
            ->offset($data['page'] * $data['pageSize'])
            ->limit($data['pageSize'])
            ->get();
    }

    /**
     * Display the specified hackathon.
     *
     * @param  \App\Models\Hackathon  $hackathon
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $hackathon = Hackathon::find($id);
        if (!$hackathon) {
            return response()->json([
                'message' => 'Product not found.'
            ], Response::HTTP_NOT_FOUND);
        }

        // TODO: include related developments?
        return $hackathon;
    }
}
