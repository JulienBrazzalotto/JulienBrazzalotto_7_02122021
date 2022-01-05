<template>
    <div>
        <HeaderProfile />
        <div>
            <h1>Mon compte</h1>
            <form>
                <ul>
                    <li>
                        <label for="nom">Nom</label>
                        <input type="text" v-model="user.nom" placeholder="Nom" size="50" required>
                    </li>
                    <li>
                        <label for="prenom">Prénom</label>
                        <input type="text" v-model="user.prenom" placeholder="Prenom" size="50" required>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" v-model="user.email" placeholder="Email" size="50" required>
                    </li>
                </ul>
                <div>
                    <button @click="updateUser()" class="button"><i class="fas fa-edit"></i> Enregistrer les modifications</button>
                    <button @click="deleteUser()" class="button espacement"><i class="far fa-trash-alt"></i> Supprimer le compte</button>
                </div>
                
            </form>
        </div>
        <router-link to="/allposts" class="button">Retour aux posts</router-link>
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
    },
    data() {
        return {
            user: {
                id: '',
                nom: '',
                prenom: '',
                email: '',
            }
        
        }
    },
    mounted () {
        this.getUser();
    },
    methods: {
        getUser() {
            const Id = localStorage.userId;

            fetch(`http://localhost:3000/api/auth/${Id}`) 
                .then(response => response.json())
                .then(data => (this.user = data))
        
        },
        updateUser() {
            const Id = localStorage.userId;

            const regexText = /^[a-zA-Z-\s]+$/;
            const regexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/; // eslint-disable-line
            

            if (this.user.nom === "") {
                alert("Veuillez remplir votre nom");
            } else if (regexText.test(this.user.nom) === false) {
                alert("Veuillez vérifier que l'écriture de votre nom soit uniquement en lettre");}

            if (this.user.prenom === "") {
                alert("Veuillez remplir votre prénom");
            } else if (regexText.test(this.user.prenom) === false) {
                alert("Veuillez vérifier que l'écriture de votre prénom soit uniquement en lettre");}

            if (this.user.email === "") {
                alert("Veuillez remplir votre adresse email");
            } else if (regexEmail.test(this.user.email) === false) {
                alert("Veuillez écrire une adresse email valide");
            } else if ((regexText.test(this.user.nom) === true) && regexText.test(this.user.prenom) === true && regexEmail.test(this.user.email) === true) {
            
                fetch(`http://localhost:3000/api/auth/${Id}`, {
                    method: "PUT",
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.user)
                })
                    .then(response => response.json())
                    .then(data => (this.user = data))
                    .then(() => {
                        alert("Votre modification est bien prise en compte")
                        this.$router.go();
                    })
            }
        },
        deleteUser() {
            const Id = localStorage.userId;
            if (confirm("Voulez-vous vraiment supprimer le compte") == true) {

                fetch(`http://localhost:3000/api/auth/${Id}`, {
                    method: "DELETE",
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.user)
                })
                    .then(response => response.json())
                    .then(() => { 
                        alert("La suppression du compte est bien prise en compte")
                        localStorage.clear();
                    })
                    .then(this.$router.push("/"))
            }
        }
    }
}
</script>

<style scoped>

h1 {
    margin: 30px 0 50px 0;
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
}

label {
    font-size: 1.3rem;
}

li {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin-bottom: 30px;
}

input {
    font-size: 1.2rem;
}

.button {
    margin: 10px 0 50px 0;
    padding: 5px 30px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    text-decoration: none;
    color: #000000;
    background: #ffd7d7;
    font-size: 1rem;
    cursor: pointer;
}

.espacement {
    margin-left: 10px;
}

</style>