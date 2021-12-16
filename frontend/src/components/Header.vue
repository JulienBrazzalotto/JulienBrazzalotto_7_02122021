<template>
  <header>
    <a href="/">
      <img src="../assets/images/logo-groupomania.png" alt="Logo Groupomania" />
    </a>
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


</style>