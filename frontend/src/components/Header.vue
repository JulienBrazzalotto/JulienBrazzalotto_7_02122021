<template>
  <header class="nav">
    <p>
    <img src="../assets/images/logo-groupomania.png" alt="Logo Groupomania" />
    </p>
    <nav>
      <router-link to="/signup" class="link">Inscription</router-link>
      <router-link to="/login" class="link">Se connecter</router-link>
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
  height: 5vw;
}

.link {
  padding-left: 50px;
  font-size: 1.5vw;
  text-decoration: none;
}

.link:hover {
  color: #fd2d01;

}
.nav {
  padding: 50px;
  font-size: 1rem;
}

.nav a {
  font-weight: bold;
  color: #000000;
}

.nav a.router-link-exact-active {
  color: #fd2d01;
}

</style>