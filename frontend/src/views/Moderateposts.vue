<template>
    <div>
        <HeaderProfile />
        <AdminNav />
            <article >
                <div class="filter">
                    <label for="moderate" v-if="moderate === false">Cochez pour voir les posts non modérés</label>
                    <label for="moderate" v-if="moderate === true">Décochez pour voir tous les posts</label><br>
                    <input v-model="moderate" type="checkbox" id="moderate" class="moderate" name="moderate">
                </div>
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Titre du post</th>
                        <th>Message du post</th>
                        <th>Image du post</th>
                        <th>Modération</th>
                    </tr>
                    <tr v-bind:key="index" v-for="(post, index) in filterList">
                            <td><input type="text" v-model="post.user.nom" required aria-label="Nom de l'auteur du post"></td>
                            <td><input type="text" v-model="post.user.prenom" required aria-label="Prénom de l'auteur du post"></td>
                            <td><input type="text" v-model="post.title" required aria-label="Titre du post"></td>
                            <td><textarea type="text" v-model="post.content" required aria-label="Message du post"></textarea></td>
                            <td><img v-if="post.image" :src="post.image" alt="Image du post"></td>
                            <td>
                                <button @click="moderatePost(index)" aria-label="Modérer ce post" v-if="post.moderate === false"><i class="fas fa-check"></i></button>
                                <button @click="deletePost(index)" aria-label="Supprimer ce post"><i class="fas fa-times"></i></button>
                            </td>
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
    name: 'ModeratePosts',
    components: {
        HeaderProfile,
        AdminNav,
        Footer
    },
    data () {
        return {
            posts: [],
            moderate: true
        }
    },
    computed : {
        filterList() {
            return this.posts.filter((post) =>{
                if (post.moderate === true) {
                    return post.moderate != this.moderate;
                } else {
                    return post
                }
            })
        }
    },
    methods : {

        getPosts() {
            const token = JSON.parse(localStorage.getItem("userToken"))

            fetch('http://localhost:3000/api/posts/', {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            
            .then(response => response.json())
            .then(data => (this.posts = data))
            .catch(alert)
        },
        moderatePost(index) {
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment valider ce post") === true) {
                
                let data = new FormData()
                    data.append('moderate', true)

                fetch(`http://localhost:3000/api/posts/${this.filterList[index].id}`, {
                    method: "PUT",
                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                    body: data
                })
                .then((response) => response.json())
                .then(data => (this.filterList[index] = data))
                .then(() => {
                    this.$router.go()
                })
                .catch(alert)
            }
        },
        deletePost(index) {
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment supprimer ce post") === true) {

                fetch(`http://localhost:3000/api/posts/${this.filterList[index].id}`, {
                    method: "DELETE",
                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                    body : JSON.stringify(this.posts[index])
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
        this.getPosts()
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

.button {
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

button {
    margin: 0 5px 0 0;
    padding: 5px 5px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1vw;
    cursor: pointer;
    text-decoration: none;
    color: #000000;
}

input,
textarea {
        font-size: 1vw;
}

img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
}

tr {
    padding-bottom: 80px;
}

.filter {
    margin: 30px 0 30px 0;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
    border-radius: 20px;
    font-size: 1.3rem;
}

input[type=checkbox] {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    border-radius: 6px;
    margin: 5px 0;
    height: 20px;
    width: 20px;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
    
}

input[type="checkbox"]:checked {
    background: #fd2d01 ;
}

@media screen and (max-width:1024px) {

    input {
    font-size: 1.5vw;
    }
}
@media screen and (max-width:768px) {

    input,
    textarea {
        width: 85vw;
        height: 5vw;
        font-size: 0.9rem;
    }

    button {
        width: 100%;
        margin: 0 0 5px 0;
        padding: 5px 10px;
    }

    i {
        font-size: 1rem;
    }

    th {
        display: none;
    }

    tr {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
    }

    .button {
        margin-bottom: 50px;
        font-size: 0.8rem;
    }
}

</style>