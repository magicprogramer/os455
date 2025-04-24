<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Events\PostAdded;
use Illuminate\Support\Facades\Auth;
use App\Events\PostDeleted;
class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        return view("posts.index", ['posts' =>
            Post::all()->where('enabled', true)->sortByDesc('created_at')]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //$users = User::select('id', 'name')->get();
        $user = Auth::user();
        return view("posts.create", ['user' => $user]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $post = new Post($request->only(['title', 'body', 'user_id']));
        $post->save();
        event(new PostAdded($post));
        return redirect()->route('posts.show', $post);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $post)
    {
        $post = Post::find($post);
        return view("posts.show", ['post' =>$post, 'user' => $post->user]);

        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $post)
    {
        if (Auth::user()->id != Post::find($post)->user_id)
        {
            abort(403);
        }
        $user =  Auth::user();
        $post = Post::find($post);
        return view("posts.edit", ['post' => $post, 'user' => $user]);
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
        $post = Post::find($post);
        $user = $post->user;
        event(new PostDeleted($user));
        $post->delete();
        return redirect()->route('posts.index');
    }
}
