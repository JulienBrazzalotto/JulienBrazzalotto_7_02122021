<template>
  <section id="app" class="app">
    <nav class="nav">
    <Header/>
    </nav>
    <router-view/>
  </section>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>


<style>
body{
  margin: 0;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 10vw 0 10vw;
  text-align: center;
  color: #000000;
}

.padding {
  padding-left: 10px;
}

.nav {
  padding: 30px;
  font-size: 1rem;
  justify-content: center;
}

.nav a {
  font-weight: bold;
  color: #000000;
}

.nav a.router-link-exact-active {
  color: #FD2D01;
}
</style>
