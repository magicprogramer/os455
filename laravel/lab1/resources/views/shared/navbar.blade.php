<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('posts.index') ? 'fw-bold text-dark' : '' }}" 
                       href="{{ route('posts.index') }}">
                        Home
                    </a>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Posts
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <a class="dropdown-item {{ request()->routeIs('posts.index') ? 'fw-bold text-dark bg-primary' : '' }}" 
                               href="{{ route('posts.index') }}">
                                All Posts
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item {{ request()->routeIs('posts.create') ? 'fw-bold text-dark bg-primary' : '' }}" 
                               href="{{ route('posts.create') }}">
                                Create Post
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
    @auth
        <form method="POST" action="{{ route('logout') }}" class="d-inline">
            @csrf
            <button type="submit" class="nav-link btn btn-link text-dark" style="text-decoration: none;">
                Logout
            </button>
        </form>
    @else
        <a class="nav-link" href="{{ route('login') }}">Login</a>
    @endauth
</li>

            </ul>
        </div>
    </div>
</nav>
