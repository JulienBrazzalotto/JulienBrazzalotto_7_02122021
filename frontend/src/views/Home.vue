<template>
  <div>
    <Header />
    <h1>Bienvenue sur le réseau social de l'entreprise <strong>Groupomania</strong></h1>
    <h2>Metéo actuelle sur le lieu de l'entreprise</h2>
    <div>
      <p>{{meteo.location.country}}, {{meteo.location.name}}, {{meteo.current.last_updated}}</p>
      <div>
        <img :src="meteo.current.condition.icon" alt="Icone météo">
        <p>{{meteo.current.condition.text}}</p>
      </div>
      <p>Température: {{meteo.current.temp_c}} °C</p>
    </div>
    <h3>Nous vous souhaitons une bonne journée sur notre réseau social</h3>
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
  },
  data() {
    return {
      meteo: {
        current: {
          condition: {}
        },
        location: {}
      }
    }
  },
  methods: {
    getmeteo() {
      fetch('http://api.weatherapi.com/v1/current.json?key='+`${process.env.VUE_APP_METEO}`+'&q=aubiet&aqi=no&lang=fr')

        .then (response => response.json())
        .then (data => (this.meteo = data))
        .catch(error => console.log(error))
    }
  },
  mounted() {
    this.getmeteo()
  }
}

</script>

<style scoped>
h1 {
  color: #fd2d01;
  padding: 70px 0 50px 0;
  font-size: 2rem;
}

h3 {
  margin: 50px 0;
  color: #fd2d01;
}
</style>
