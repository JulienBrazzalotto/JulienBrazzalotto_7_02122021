<template>
    <div>
        <HeaderProfile />
        <AdminNav />
            <article >
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Titre du post</th>
                        <th>Message du post</th>
                        <th>Image du post</th>
                    </tr>
                    <tr v-bind:key="index" v-for="(post, index) in posts">
                        <td><input type="text" v-model="post.user.nom" required aria-label="Nom de l'auteur du post"></td>
                        <td><input type="text" v-model="post.user.prenom" required aria-label="Prénom de l'auteur du post"></td>
                        <td><input type="text" v-model="post.title" required aria-label="Titre du post"></td>
                        <td><textarea type="text" v-model="post.content" required aria-label="Message du post"></textarea></td>
                        <td><img v-if="post.image" :src="post.image" alt="Image du post"></td>
                        <button @click="deletePost(index)" aria-label="Supprimer ce post"><i class="far fa-trash-alt"></i></button>
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
    name: 'AdminPosts',
    components: {
        HeaderProfile,
        AdminNav,
        Footer
    },
    data () {
        return {
            posts: [],
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
        deletePost(index) {
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment supprimer le post") === true) {

                fetch(`http://localhost:3000/api/posts/${this.posts[index].id}`, {
                    method: "DELETE",
                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                    body : JSON.stringify(this.posts[index])
                })
                .then(response => response.json())
                .then(data => (this.posts[index] = data))
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
    margin-top: 25px;
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
        width: 20%;
        margin: 0 0 50px 0;
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