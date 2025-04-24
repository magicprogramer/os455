<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view("posts.index", ['posts' =>Post::all()->where('enabled', true)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::select('id', 'name')->get();
        return view("posts.create", ['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $post = new Post($request->only(['title', 'body', 'user_id']));
        $post->save();
        
        return redirect()->route('posts.show', $post);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $post)
    {
        $user = User::find(Post::find($post)->user_id);
        return view("posts.show", ['post' =>Post::find($post), 'user' => $user]);

        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $post)
    {
        $users = User::select('id', 'name')->get();
        $post = Post::find($post);
        return view("posts.edit", ['post' => $post, 'users' => $users]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $post)
    {
        Post::where('id', $post)->update(
            $request->only(['title', 'body', 'user_id'])
        );

        return redirect()->route("posts.show", $post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $post)
    {
        Post::where('id', $post)->delete();
        return redirect()->route('posts.index');
    }
}
