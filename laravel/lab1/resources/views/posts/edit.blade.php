@extends('layouts.main')
@section('title', "Update post")

@section('content')
<form action="{{ route('posts.update', ['post' => $post->id]) }}" method="POST" >
    @method('PUT')
    @include('posts._form')
</form>
@endSection

@section('footer')

@endsection