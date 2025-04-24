@extends('layouts.main')

@section('title', 'Post List')


@section('content')
<table class="table">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
            
            <th scope="col">User</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($posts as $post)
        <tr>
            <th scope="row">{{ $post['id'] }}</th>
            <td>
                <a href="{{route('posts.show', ['post' => $post['id']]) }}">
                    {{ substr($post['title'], 0, 30) . "...." }}
                </a>
            </td>
            <td>{{ substr($post['body'], 0, 50) . "...." }}</td>
            <td>{{$post->user->name}} posts count : {{$post->user->posts_count}} </td>
            <td>
                <a class="btn btn-info" href="{{ route('posts.edit' ,['post'=> $post['id']])}}">Edit</a>
                <form class="form-inline" action="{{ route('posts.destroy' , ['post' => $post['id']]) }}" method="POST">
                    @csrf
                    @method("DELETE")
                    <button type="submit" class="btn btn-danger mb-2">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection


@section('footer')
<p>Footer all rights reserved</p>
@endsection
