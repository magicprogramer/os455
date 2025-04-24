<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\PostAdded;
use App\Models\User;
use App\Models\Post;

class UpdateCounter
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PostAdded $event): void
    {
        User::where('id', $event->post->user_id)->increment('posts_count');
    }
}
