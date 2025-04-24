@extends('layouts.main')
@section('title', 'Show Post');
@section('content')
<div class="w-75 h-75 d-flex justify-content-center align-item-center text-white bg-dark">
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{$post['title']}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">created by {{$user->name}}at {{$post['created_at']}}</h6>
      <p class="card-text">{{$post['body']}}</p>
    </div>
  </div>
</div>
@endsection
