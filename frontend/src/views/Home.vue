<template>
  <div>
    <Header />
    <h1>Bienvenue sur le réseau social de l'entreprise <strong>Groupomania</strong></h1>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  name: 'home',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
h1 {
  color: #fd2d01;
  padding: 200px 0 200px 0;
  font-size: 2rem;
}
</style>
