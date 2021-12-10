<template>
  <header>
    <a href="/">
        <img src="../assets/images/logo-groupomania.png" alt="Logo groupomania">
    </a>
    <div>
        <router-link to="/signup" class="padding">Inscription</router-link>
        <router-link to="/login" class="padding">Se connecter</router-link>
    </div>
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

.padding {
  padding-left: 50px;
  font-size: 1.3vw;
  text-decoration: none;
}

</style>