<template>
    <div>
        <Header v-if="id === null " />
        <HeaderProfile v-else/>
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
        <router-link to="/allposts" class="button lien" v-if="id != null ">Retour aux posts</router-link>
        <Footer />
    </div>
</template>

<script>
import Header from "../components/Header";
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";

export default {
    name: 'home',
    components: {
        Header,
        HeaderProfile,
        Footer
    },
    data () {
        return {
            id: null
        }
    },
    methods : {
        User() {
            this.id = JSON.parse(localStorage.getItem("userId"))
        }
    },
    mounted() {
        this.User()
    }
}
</script>

<style scoped>

h1 {
    width: 98%;
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
    margin-bottom: 30px;
}

.button {
    padding: 5px 30px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1rem;
    cursor: pointer;
}

.lien {
    text-decoration: none;
    color: #000000;
}

@media screen and (max-width:768px) {

    h1 {
        font-size: 1.2rem;
    }
}

</style>

