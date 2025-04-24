@extends('layouts.main')
@section('title', "Create post")

@section('content')
<form action="{{ route('posts.store') }}" method="POST" class="needs-validation">
    @include('posts._form', ['users' => $users])
</form>
@endSection