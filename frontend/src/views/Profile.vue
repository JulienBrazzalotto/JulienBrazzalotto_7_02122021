<template>
    <div>
        <HeaderProfile />
        <div>
            <h1>Mon compte</h1>
            <form>
                <ul>
                    <li>
                        <label for="nom" aria-label="Nom de l'utilisateur">Nom</label>
                        <input type="text" v-model="user.nom" placeholder="Nom" size="50" required aria-label="Nom de l'utilisateur">
                    </li>
                    <li>
                        <label for="prenom" aria-label="Prénom de l'utilisateur">Prénom</label>
                        <input type="text" v-model="user.prenom" placeholder="Prenom" size="50" required aria-label="Prénom de l'utilisateur">
                    </li>
                    <li>
                        <label for="email" aria-label="Email de l'utilisateur">Email</label>
                        <input type="email" v-model="user.email" placeholder="Email" size="50" required aria-label="Email de l'utilisateur">
                    </li>
                    <li v-if="user.image">
                        <img :src="user.image" alt="Photo de profil" class="file" width="200px" height="200px">
                    </li>
                    <li>
                        <label v-if="!user.image" for="file" class="label-file" aria-label="Choisir la photo de profil">Choisir une photo de profil</label>
                        <button v-else @click="deletefile()" class="label-file" aria-label="Supprimer la photo de profil"> Supprimer cette photo de profil</button>
                        <input type="file" accept=".jpeg, .jpg, .png, .webp" v-on:change="uploadFile" id="file" class="input-file" aria-label="Photo de profil">
                    </li>
                    <li>
                        <button v-on:click="show" class="button">Modifier son mot de passe</button>
                    </li>
                    <li v-if="button">
                        <input v-model="oldPassword" type="text" placeholder="Ancien mot de passe" size="30" class="password">
                        <input v-model="newPassword" type="text" placeholder="Nouveau mot de passe" size="30" class="password">
                        <input v-model="confirmNewPassword" type="text" placeholder="Confirmer le mot de passe" size="30" class="password">
                        <button @click="modifyPassword()" class="button">Valider mon nouveau mot de passe</button>
                    </li>
                </ul>
                <div class="submit">
                    <button @click="updateUser()" class="button" aria-label="Modifier le compte de cet utilisateur"><i class="fas fa-edit"></i> Enregistrer les modifications</button>
                    <button @click="deleteUser()" class="button espacement" aria-label="Supprimer le compte de cet utilisateur"><i class="far fa-trash-alt"></i> Supprimer le compte</button>
                </div>
            </form>
        </div>
        <router-link to="/allposts" class="button" aria-label="Retour au fil d'actualité">Retour aux posts</router-link>
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
            preview: null,
            posts: [],
            oldPassword:'',
            newPassword:'',
            confirmNewPassword:'',
            button : false
        }
    },
    mounted () {
        this.getUser();
    },
    methods: {
        show: function () {
            return this.button = true;
        },
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
            .catch(alert)
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
            } else if ((regexText.test(this.user.nom) === true) && regexText.test(this.user.prenom) === true && regexEmail.test(this.user.email) === true && this.user.image === '') {
                let data = new FormData()
                    data.append('nom', this.user.nom)
                    data.append('prenom', this.user.prenom)
                    data.append('email', this.user.email)
                    data.append('image', '')

                fetch(`http://localhost:3000/api/auth/${Id}`, {
                    method: "PUT",
                        headers: {
                        'authorization': `Bearer ${token}`
                        },
                        body: data
                })
                .then(response => response.json())
                .then(data => (this.user = data))
                .then(() => {
                    alert("Votre modification est bien prise en compte")
                    this.$router.go();
                })
                .catch(error => console.log(error))
        
            } else if ((regexText.test(this.user.nom) === true) && regexText.test(this.user.prenom) === true && regexEmail.test(this.user.email) === true && this.user.image != '') {
                
                var fileName = document.getElementById("file").value
                var idxDot = fileName.lastIndexOf(".") + 1;
                var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                
                if (extFile === "jpg" || extFile === "jpeg" || extFile === "png" || extFile === "webp" || extFile === ""){
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
                        .then(() => {
                            alert("Votre modification est bien prise en compte")
                            this.$router.go();
                        })
                        .catch(error => console.log(error))
                }else{
                    alert("Uniquement les fichiers jpg, jpeg, png et webp sont acceptés!");
                }   
            }
        },
        deleteUser() {
            if (confirm("Voulez-vous vraiment supprimer le compte") == true) {
                const Id = JSON.parse(localStorage.getItem("userId"))
                const token = JSON.parse(localStorage.getItem("userToken"))

                fetch(`http://localhost:3000/api/posts/${Id}/posts`, {
                    method: "GET",
                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                })

                .then(response => response.json())
                .then(data => (this.posts = data))
                .then (() => {
                    let pub = this.posts

                    for ( let i = 0 ; i < pub.length ; i++) {
                        if (pub[i].image) {
                        fetch(`http://localhost:3000/api/posts/${pub[i].id}`, {
                            method: "DELETE",
                            headers: {
                                'authorization': `Bearer ${token}`
                            },
                        })
                            .then(response => response.json())
                            .catch(error => console.log(error))
                        }
                    }
                })
                .then(() => {
                    fetch(`http://localhost:3000/api/auth/${Id}`, {
                        method: "DELETE",
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => response.json())
                        .then(() => { 
                            alert("La suppression du compte est bien prise en compte")
                            localStorage.clear();
                        })
                        .then(this.$router.push("/"))
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
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
        },
        modifyPassword() {
            const Id = JSON.parse(localStorage.getItem("userId"))
            const token = JSON.parse(localStorage.getItem("userToken"))
            const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{3,50}$/;


            if (this.oldPassword === '')
                alert("Veuillez remplir votre ancien mot de passe")
            
            if (this.newPassword === '')
                alert("Veuillez remplir votre nouveau mot de passe")

            if (this.confirmNewPassword === '')
                alert("Veuillez remplir votre confirmation de mot de passe")

            if (regexPassword.test(this.newPassword) === false){
                alert("Le nouveau mot de passe doit avoir une longueur de 3 à 50 caractères avec au moins un chiffre, une minuscule, une majuscule !!!")
            } else if (this.confirmNewPassword === this.newPassword) {

				let data = {
                    oldPassword: this.oldPassword,
					password : this.newPassword
				}

				fetch(`http://localhost:3000/api/auth/profile/${Id}`, {
                    method: "PUT",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
				})
                .then(response => {
                    if(response.ok) {
                    return response.json()
                    } else {
                    return response.text()
                    .then((text) => {
                        throw new Error(text)}
                    )
                    }
                })
				.then(() => {
                    alert("Le mot de passe a été modifié")
					this.$router.go();
				})
				.catch(alert)
			} else {
				alert("Le nouveau mot de passe et sa confirmation ne sont pas identiques")
			}
        }
    }
}
</script>

<style scoped>

h1 {
    margin: 30px 0 30px 0;
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
    padding: 0;
}

label {
    font-size: 1.3rem;
}

li {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
}

input {
    font-size: 1.2rem;
}

.file {
    width: 200px;
    height: 200px;
    margin-top: 10px;
    border: 2px solid #fd2d01;
    border-radius: 100px;
}

.input-file {
    display: none;
}

.button,
.label-file {
    margin: 20px 0 0 0;
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

.submit {
    margin-bottom: 30px;
}

.password {
    margin-top: 5px;
}

@media screen and (max-width:1024px) {

    h1 {
        width: 98%;
        font-size: 1.5rem;
    }
    
    input,
    label {
        font-size: 1rem;
    }


}

@media screen and (max-width:768px) {

    h1 {
        font-size: 1.2rem;
    }

    input,
    label {
        font-size: 0.8rem;
    }

    .submit {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .button {
        width: 50%;
        margin-bottom: 0;
    }

    .espacement {
        margin-left: 0;
    }
}

</style>