<template>
    <div>
        <Header />
        <div class="numéro">
            <h1>Numéros utiles :</h1>
            <ul>
                <li>
                    Accueil : 7000
                </li>
                <li>
                    Secrétariat : 7001
                </li>
                <li>
                    Poste de secours : 7002
                </li>
                <li>
                    Service technique : 7003
                </li>
                <li>
                    Service DRH : 7004
                </li>
                <li>
                    Service de paie : 7005
                </li>
                <li>
                    Service logistique : 7006
                </li>
                <li>
                    Service Comité d'Entreprise : 7007
                </li>
            </ul>
        </div>
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
  width: 100%;
  font-size: 2rem;
  background: #ffd7d7;
  border: 2px solid #fd2d01;
  border-radius: 20px;
}

ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 0 40px 0 40px;
    border: 2px solid #fd2d01;
}

li {
    padding: 15px 0 15px 0;
    font-size: 1.2rem;
    color: #000000;
}

.numéro {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>

