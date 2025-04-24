@csrf
<div class="form-group">
    <label for="title">Title</label>
    <input type="text" name="title" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Post title"
           value="{{ old('title', isset($post) ? $post->title : null) }}">
    @error('title')
    <div>
        {{ $message }}
    </div>
    @enderror
</div>
<div class="form-group">
    <label for="exampleInputPassword1">Body</label>
    <textarea class="form-control" name="body">{{ old('body', isset($post) ? $post->body : null) }}</textarea>
    @error('body')
    <div>
        {{ $message }}
    </div>
    @enderror
    <select name="user_id">
        @foreach($users as $user)
        <option value = {{ $user->id }}>{{$user->name}}</option>
        @endforeach
</select>
</div>
<button type="submit" class="btn btn-primary">Submit</button>