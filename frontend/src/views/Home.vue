<template>
  <div>
    <Header />
    <h1>Bienvenue sur le réseau social de l'entreprise <strong>Groupomania</strong></h1>
    <h2>Metéo sur le lieu de l'entreprise</h2>
    <p>{{meteo.location.country}}, {{meteo.location.name}}</p>
    <div class="tab">
      <div class="meteo">
        <div class="meteo_auj">
          <h3>Actuellement</h3>
          <img :src="meteo.current.condition.icon" alt="Icone météo">
          <p>{{meteo.current.condition.text}}</p>
          <p>Température: {{meteo.current.temp_c}} °C</p>
        </div>
        <div class="meteo_dem">
          <h3>demain</h3>
          <img :src="meteo.forecast.forecastday[1].day.condition.icon" alt="Icone météo">
          <p>{{meteo.forecast.forecastday[1].day.condition.text}}</p>
          <p>Température maximale: {{meteo.forecast.forecastday[1].day.maxtemp_c}} °C</p>
          <p>Température minimale: {{meteo.forecast.forecastday[1].day.mintemp_c}} °C</p>
        </div>
      </div>
    </div>
    <h4>Nous vous souhaitons une bonne journée !!!</h4>
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
        forecast: {
          forecastday: [
            1, {
              day:{
                condition : {}
              }
            }
          ]
        },
        location: {}
      }
    }
  },
  methods: {
    getmeteo() {
      fetch('https://api.weatherapi.com/v1/forecast.json?key='+`${process.env.VUE_APP_METEO}`+'&q=aubiet&days=3&aqi=no&lang=fr')

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
  color: #fd2d01;
}

h4{
  margin-top: 50px;
  color: #fd2d01;
  font-size: 1.2rem;
}

.tab{
  display: flex;
  justify-content: center;
}

.meteo {
  display: flex;
  justify-content: space-around;
  width: 50%;
  padding: 5px;
  border:solid 2px #fd2d01;
  border-radius: 20px
}

@media screen and (max-width:768px) {

  .meteo {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>