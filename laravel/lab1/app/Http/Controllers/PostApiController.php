<?php

namespace App\Http\Controllers;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class PostApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = Post::all();
        return new JsonResponse($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $user = Auth::user();
        $request['user_id'] = $user->id;
        $data = Post::create($request->all());
        return new JsonResponse($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $data = Post::find($id);
        return new JsonResponse($data, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $data = Post::find($id);
        if (Auth::user()->id != $data->user_id) {
            return new JsonResponse(['msg' => 'forbiden'], 403);
        }
        $data->update($request->all());
        return new JsonResponse($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $data = Post::find($id);
        $user = Auth::user();
        if ($user->id != $data->user_id) {
            return new JsonResponse(['msg' => 'forbiden'], 401);
        }
        $data->delete();
        return new JsonResponse($data, 200);
    }
}
