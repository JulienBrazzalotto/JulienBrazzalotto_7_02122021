<template>
  <section id="app" class="app">
    <div class="nav">
      <Header />
    </div>
    <router-view />
    <div>
      <Footer />
    </div>
  </section>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
};
</script>


<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 10vw 0 10vw;
  text-align: center;
  color: #000000;
}

.nav {
  padding: 50px;
  font-size: 1rem;
  justify-content: center;
}

.nav a {
  font-weight: bold;
  color: #000000;
}

.nav a.router-link-exact-active {
  color: #fd2d01;
}
</style>
