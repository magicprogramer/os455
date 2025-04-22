<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
class PostController extends Controller
{
    //
    public function index()
    {
        return view("posts.index", ['msg' => 'Display a listing of the resource.']);
    }
    public function create()
    {
        return view('posts.create', ['msg' => 'Show the form for creating a new resource.']);
    }
    public function store()
    {
        return view("posts.store", ['msg' => 'Store a newly created resource in storage.']); 
    }
    public function edit($id)
    {
        if (!$id || !is_numeric($id)) return redirect("bad request");
        return view("posts.show", ["msg" => "Show the form for editing the specified
resource with ${id}"]);
    }
    public function show($id)
    {
        
        if (!$id || !is_numeric($id)) return redirect("bad request");
        return view("posts.show", ['msg' => "Display the specified resource with id . {$id}"]);
    }
    public function update($id)
    {
        if (!$id || !is_numeric($id)) return redirect("bad request");
        return "Update the specified resource with id {$id} in storage.";
    }
    public function destroy($id)
    {
        if (!$id || !is_numeric($id)) return redirect("bad request");
        return "Remove the specified resource with id {$id} from resources.";
    }

}
