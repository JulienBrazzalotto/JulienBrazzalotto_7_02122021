<template>
    <div>
        <HeaderProfile />
        <h1>Bienvenue sur le réseau social de l'entreprise <strong>Groupomania</strong></h1>
        <Footer />
    </div>
</template>

<script>
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";

export default {
  name: 'Profile',
  components: {
    HeaderProfile,
    Footer
  }
}
</script>