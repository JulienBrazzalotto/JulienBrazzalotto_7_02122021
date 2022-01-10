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
                    <li v-if="user.image">
                        <img :src="user.image" :alt="user.title" class="file">
                    </li>
                    <li>
                        <label v-if="!user.image" for="file" class="label-file">Choisir une photo de profil</label>
                        <button v-else @click="deletefile()" class="label-file"> Supprimer cette photo de profil</button>
                        <input type="file" accept="image/jpeg, image/jpg, image/png, image/webp" v-on:change="uploadFile" id="file" class="input-file">
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
                image:''
            },
            preview: null
        
        }
    },
    mounted () {
        this.getUser();
    },
    methods: {
        getUser() {
            const Id = JSON.parse(localStorage.getItem("userId"))
            const token = JSON.parse(localStorage.getItem("userToken"))

            fetch(`http://localhost:3000/api/auth/${Id}`, {
                method: "GET",
                headers: {
                'authorization': `Bearer ${token}`
                }
            })

                .then(response => response.json())
                .then(data => (this.user = data))
        
        },
        updateUser() {
            const Id = JSON.parse(localStorage.getItem("userId"))
            const token = JSON.parse(localStorage.getItem("userToken"))
            const fileField = document.querySelector('input[type="file"]');

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
            } else if ((regexText.test(this.user.nom) === true) && regexText.test(this.user.prenom) === true && regexEmail.test(this.user.email) === true && this.user.image === null) {
            
                fetch(`http://localhost:3000/api/auth/${Id}`, {
                    method: "PUT",
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(this.user)
                })
                    .then(response => response.json())
                    .then(data => (this.user = data))
                    .then(() => {
                        alert("Votre modification est bien prise en compte")
                        this.$router.go();
                    })
            } else if ((regexText.test(this.user.nom) === true) && regexText.test(this.user.prenom) === true && regexEmail.test(this.user.email) === true && this.user.image != null) {
                let data = new FormData()
                data.append('nom', this.user.nom)
                data.append('prenom', this.user.prenom)
                data.append('email', this.user.email)
                data.append('image', fileField.files[0])


                fetch(`http://localhost:3000/api/auth/${Id}`, {
                    method: "PUT",
                        headers: {
                        'authorization': `Bearer ${token}`
                        },
                        body: data
                })
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                    this.$router.go();
                })
                .catch(error => console.log(error))
            }
        },
        deleteUser() {
            const Id = JSON.parse(localStorage.getItem("userId"))
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment supprimer le compte") == true) {

                fetch(`http://localhost:3000/api/auth/${Id}`, {
                    method: "DELETE",
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
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
        },
        uploadFile(e) {
            if (e.target.files) {
                let reader = new FileReader()
                reader.onload = (event) => {
                    this.preview = event.target.result
                    this.user.image = event.target.result
                }
                reader.readAsDataURL(e.target.files[0])
            }
        },
        deletefile() {
            this.user.image = '';
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

.file {
    height: 400px;
}

.input-file {
    display: none;
}

.button,
.label-file {
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