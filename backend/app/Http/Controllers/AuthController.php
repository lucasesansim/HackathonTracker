<?php
namespace App\Http\Controllers\V1;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    
    /*
     * Registers a user for validation on being sent a username, an email and password
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $data = $request->only('name', 'email', 'password');

        $validator = Validator::make(
            $data, 
            [ 
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6|max:50',
            ],
            [
                'required' => 'The :attribute field is required.'
            ]
        );
        if ($validator->fails()) {
            return response()->json(['error' => $validator->failed()], Response::HTTP_BAD_REQUEST);
        }

        $userData = array(
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        );
        $user = User::create($userData);

        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];
        return response()->json([
            'message' => 'User created',
            'token' => JWTAuth::attempt($credentials),
            'user' => $user
        ]);
    }

    /*
     * Logs in a user with email and password, returning the user's token.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $validator = Validator::make(
            $credentials, 
            [ 
                'email' => 'required|email',
                'password' => 'required|string|min:6|max:50'
            ],
            [
                'required' => 'The :attribute field is required.'
            ]
        );
        if ($validator->fails()) {
            return response()->json(['error' => $validator->failed()], Response::HTTP_BAD_REQUEST);
        }

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Login failed, invalid credentials',
                ], Response::HTTP_UNAUTHORIZED);
            }
        } catch (JWTException $exception) {
            return response()->json([
                'Error' => $exception->getMessage(),
            ], 500);
        }

        return response()->json([
            'token' => $token,
            'user' => Auth::user()
        ]);
    }

    /*
     * Logs out a user, destroying its token.
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        try {
            JWTAuth::invalidate();
        } catch (JWTException $exception) {
            return response()->json([
                'message' => $exception->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->noContent();
    }

    /*
     * Get's a user's data, token must be present in header.
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLoggedUser()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorization' => [
                'token' => JWTAuth::fromUser(JWTAuth::toUser()),
                'type' => 'bearer',
            ]
        ]);
    }
}