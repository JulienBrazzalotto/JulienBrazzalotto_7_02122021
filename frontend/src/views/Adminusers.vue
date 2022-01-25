<template>
    <div>
        <HeaderProfile />
        <AdminNav />
            <article >
                <div>
                    <input v-model="search" class="search" type="search" placeholder="Rechercher un utilisateur avec son Nom ..." size=40 aria-label=" Barre de recherche d'un utilisateur avec son Nom">
                </div>
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Photo de profil</th>
                    </tr>
                    <tr v-bind:key="index" v-for="(user, index) in filterList">
                        <td><input type="text" v-model="user.nom" required aria-label="Nom" disabled></td>
                        <td><input type="text" v-model="user.prenom" required aria-label="Prénom" disabled></td>
                        <td><input type="text" v-model="user.email" required class="email" aria-label="Email" disabled></td>
                        <td>
                            <select v-model="user.role" name="role" id="role-select">
                                <option value="0">Admin</option>
                                <option value="1">Modérateur</option>
                                <option value="2">Utilisateur</option>
                            </select>
                        </td>
                        <td><img v-if="user.image" :src="user.image" alt="photo de profil"></td>
                        <button @click="modifyUser(index)" aria-label="Modifier cet utilisateur"><i class="fas fa-edit"></i></button>
                        <button @click="deleteUser(index)" aria-label="Supprimer cet utilisateur"><i class="far fa-trash-alt"></i></button>
                    </tr>
                </table>
                <router-link to="/allposts" class="button" aria-label="Retour au fil d'actualité">Retour aux posts</router-link>
            </article>
        <Footer />
    </div>
</template>

<script>
import HeaderProfile from "../components/HeaderProfile";
import AdminNav from "../components/AdminNav";
import Footer from "../components/Footer";

export default {
    name: 'AdminUsers',
    components: {
        HeaderProfile,
        AdminNav,
        Footer
    },
    data () {
        return {
            users: [],
            search: '',
            posts: []
        }
    },
    computed : {
        filterList() {
            return this.users.filter((user) =>{
                return user.nom.toLowerCase().includes(this.search.toLowerCase());
            })
        }
    },
    methods : {
        getUsers() {
            const token = JSON.parse(localStorage.getItem("userToken"))

            fetch('http://localhost:3000/api/auth/', {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            
            .then(response => response.json())
            .then(data => (this.users = data))
            .catch(alert)
        },
        deleteUser(index) {
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment supprimer cet utilisateur") === true) {

                fetch(`http://localhost:3000/api/posts/${this.filterList[index].id}/posts`, {
                    method: "GET",
                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                })
                .then(response => response.json())
                .then(data => (this.posts = data))
                .then (() => {
                    let publication = this.posts

                    for ( let i = 0 ; i < publication.length ; i++) {
                        if (publication[i].image) {
                            fetch(`http://localhost:3000/api/posts/${publication[i].id}`, {
                                method: "DELETE",
                                headers: {
                                    'authorization': `Bearer ${token}`
                                },
                            })
                            .then(response => response.json())
                            .catch(alert)
                        }
                    }
                })
                .then(() => {
                    fetch(`http://localhost:3000/api/auth/${this.filterList[index].id}`, {
                        method: "DELETE",
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    })
                    .then(response => response.json())
                    .then(() => { 
                        this.$router.go()
                        })
                    .catch(alert)
                })
                .catch(alert)
            }
        },
        modifyUser(index) {
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment modifier cet utilisateur") === true) {
                

                fetch(`http://localhost:3000/api/auth/admin/${this.filterList[index].id}`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                    body : JSON.stringify(this.filterList[index])
                })
                .then(response => response.json())
                .then(data => (this.filterList[index] = data))
                .then(() => { 
                    this.$router.go()
                })
                .catch(alert)
            }
        }
    },
    mounted(){
        this.getUsers()
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
    margin: 10px 5px 0 0;
    padding: 5px 5px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1vw;
    cursor: pointer;
    text-decoration: none;
    color: #000000;
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

.search {
    margin-bottom: 30px;
    border: 2px solid #fd2d01;
    font-size: 1.5vw;
}

input {
    font-size: 1vw;
}

hr {
    background-color: #fd2d01;
}

img {
    width: 50px;
    height: 50px;
    border: 2px solid #fd2d01;
    border-radius: 30px;
}

select {
    background-color: white;
}

@media screen and (max-width:1024px) {

    input {
        font-size: 1vw;
    }

    .search{
        font-size: 1rem;
        height: 30px;
    }
}
@media screen and (max-width:768px) {

    input:not(.search) {
        width: 85vw;
        height: 5vw;
        font-size: 0.9rem;
    }
    select {
        width: 86vw;
        height: 5vw;
        font-size: 0.9rem;
    }

    button {
        width: 20%;
        margin: 0 0 5px 0;
        padding: 5px 10px;
    }

    i {
        font-size: 1rem;
    }

    .search{
        font-size: 3vw;
        height: 30px;
    }

    th {
        display: none;
    }

    tr {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .button {
        margin-bottom: 50px;
        font-size: 0.8rem;
    }
}
</style>