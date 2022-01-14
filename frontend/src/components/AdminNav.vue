<template>
    <div class="nav">
        <h1>Administration</h1>
        <nav>
            <router-link to="/admin/users" aria-label="Administration des utilisateurs"><i class="fas fa-users"></i></router-link>
            <router-link to="/admin/posts" aria-label="Administration des posts"><i class="fas fa-mail-bulk link"></i></router-link>
            <router-link to="/admin/comments" aria-label="Administration des commentaires"><i class="fas fa-comments link"></i></router-link>
        </nav>
    </div>
</template>

<style scoped>
h1{
    width: 100%;
    font-size: 2rem;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
    border-radius: 20px;
}

img {
    height: 5vw;
}

.link {
    padding: 0 5vw;
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;
}

.link:hover {
    color: #fd2d01;

}
.nav {
    margin-bottom: 30px;
    font-size: 1rem;
}

.nav a {
    font-weight: bold;
    color: #000000;
}

.nav a.router-link-exact-active {
    color: #fd2d01;
}

@media screen and (max-width:768px) {

    h1 {
        font-size: 1.2rem;
    }

    .nav {
        margin-bottom: 10px;
    }

    .link {
        
        font-size: 15px;
    }
}
</style>