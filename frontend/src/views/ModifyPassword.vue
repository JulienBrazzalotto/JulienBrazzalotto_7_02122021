<template>
    <div>
        <HeaderProfile />
        <h1>Administration</h1>
        <h2>Modification du mot de passe</h2>
            <article >
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                    </tr>
                    <tr>
                        <td><input type="text" v-model="user.nom" required aria-label="Nom" disabled></td>
                        <td><input type="text" v-model="user.prenom" required aria-label="Prénom" disabled></td>
                        <td><input type="text" v-model="user.email" required class="email" aria-label="Email" disabled></td>
                    </tr>
                </table>
                <div>
                    <p>
                    <input type="text" v-model="newPassword" placeholder="Nouveau mot de passe" required aria-label="Nouveau mot de passe">
                    </p>
                    <p>
                    <input type="text" v-model="confirmPassword" placeholder="Confirmer le mot de passe" required aria-label="Confirmer le nouveau mot de passe">
                    </p>
                    <button @click="modifyPassword()" aria-label="Modifier le mot de passe de ce utilisateur">Valider le nouveau mot de passe</button>
                </div>
                <router-link to="/admin/users" class="button" aria-label="Retour à l'administration">Retour à l'administration</router-link>
                <router-link to="/allposts" class="button espacement" aria-label="Retour au fil d'actualité">Retour aux posts</router-link>
            </article>
        <Footer />
    </div>
</template>


<script>
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";

export default {
    name: 'AdminUsers',
    components: {
        HeaderProfile,
        Footer
    },
    data () {
        return {
            id_param: this.$route.params.id,
            user: [],
            newPassword:'',
            confirmPassword:''
        }
    },
    methods : {
        getUser() {
            const token = JSON.parse(localStorage.getItem("userToken"))

            fetch(`http://localhost:3000/api/auth/${this.id_param}`, {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            
            .then(response => response.json())
            .then(data => (this.user = data))
            .catch(alert)
        },
        modifyPassword() {
            const token = JSON.parse(localStorage.getItem("userToken"))
            const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{3,50}$/;
            if (confirm(`Voulez-vous vraiment modifier le mot de passe de cet utilisateur ?`) === true) {

                if (this.newPassword === '')
                alert("Veuillez remplir votre nouveau mot de passe")

                if (this.confirmPassword === '')
                    alert("Veuillez remplir votre confirmation de mot de passe")

                if (regexPassword.test(this.newPassword) === false) {
                    alert("Le nouveau mot de passe doit avoir une longueur de 3 à 50 caractères avec au moins un chiffre, une minuscule, une majuscule !!!")
                } else if (this.confirmPassword === this.newPassword) {

                        let data = {
                            password: this.newPassword
                        }

                        fetch(`http://localhost:3000/api/auth/admin/password/${this.id_param}`, {
                            method: "PUT",
                            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${token}`
                            },
                            body : JSON.stringify(data)
                        })
                        .then(response => response.json())
                        .then(data => (this.user = data))
                        .then(() => { 
                            this.$router.push("/admin/users")
                        })
                        .catch(alert)
                } else {
                    alert("Le nouveau mot de passe et sa confirmation ne sont pas identiques")
                }
            }
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>

<style scoped>
table {
    width: 100%;
    font-size: 1vw;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
    border-radius: 20px;
    margin: 0 0 30px 0;
}

button {
    margin: 10px 5px 30px 0;
    padding: 5px 5px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1vw;
    cursor: pointer;
    text-decoration: none;
    color: #000000;
}

img {
    width: 100px;
    height: 100px;
    border: 2px solid #fd2d01;
    border-radius: 50px;
}

.button{
    margin: 10px 0 30px 0;
    padding: 5px 3vw ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1vw;
    cursor: pointer;
    text-decoration: none;
    color: #000000;
}

h1{
    width: 100%;
    font-size: 2rem;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
    border-radius: 20px;
}

img {
    height: 5vw;
}

.link {
    padding: 0 5vw;
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;
}

.link:hover {
    color: #fd2d01;

}
.nav {
    margin-bottom: 30px;
    font-size: 1rem;
}

.nav a {
    font-weight: bold;
    color: #000000;
}

.nav a.router-link-exact-active {
    color: #fd2d01;
}

.espacement {
    margin-left: 10px;
}
@media screen and (max-width:1024px) {

    h1 {
        width: 98%;
        margin-left: 5px;
    }
}

@media screen and (max-width:768px) {

    h1 {
        font-size: 1.2rem;
    }

    .nav {
        margin-bottom: 10px;
    }

    .link {
        
        font-size: 15px;
    }
}
</style>