<template>
  <header class="nav">
    <a href="/"><img src="../assets/images/logo-groupomania.png" alt="Logo Groupomania" /></a>
    <nav>
      <router-link to="/signup" class="link" aria-label="Inscription">Inscription</router-link>
      <router-link to="/login" class="link" aria-label="Connection">Se connecter</router-link>
    </nav>
  </header>
</template>


<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

img {
  height: 60px;
}

.link {
  padding-left: 5vw;
  font-size: 1.2rem;
  text-decoration: none;
}

.link:hover {
  color: #fd2d01;

}
.nav {
  padding: 20px 5vw;
  font-size: 1vw;
}

.nav a {
  font-weight: bold;
  color: #000000;
}

.nav a.router-link-exact-active {
  color: #fd2d01;
}

@media screen and (max-width:1024px) {
  header {
    flex-direction: column;
  }

  img {
    margin-bottom: 30px;
  }

  .link {
    padding: 0 30px;
  }
}

@media screen and (max-width:768px) {
  header {
    flex-direction: column;
  }

  img {
    margin-bottom: 30px;
    height: 50px;
  }

  .link {
    padding: 0 30px;
    font-size: 15px;
  }
}

</style>