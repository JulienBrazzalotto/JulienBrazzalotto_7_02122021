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
                        <th>Commentaire</th>
                    </tr>
                    <tr v-bind:key="index" v-for="(comment, index) in comments">
                        <td><input type="text" v-model="comment.user.nom" required aria-label="Nom de l'auteur du commentaire"></td>
                        <td><input type="text" v-model="comment.user.prenom" required aria-label="Prénom de l'auteur du commentaire"></td>
                        <td><input type="text" v-model="comment.post.title" required aria-label="Titre du post"></td>
                        <td><textarea type="text" v-model="comment.content" rows="3" cols="50" required aria-label="Commentaire"></textarea></td>
                        <button @click="deleteComments(index)" aria-label="Supprimer ce commentaire"><i class="far fa-trash-alt"></i></button>
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
    name: 'AdminComments',
    components: {
        HeaderProfile,
        AdminNav,
        Footer
    },
    data () {
        return {
            comments: [],
        }
    },
    methods : {
        getComments() {
            const token = JSON.parse(localStorage.getItem("userToken"))

            fetch (`http://localhost:3000/api/comments/`, {
                    method: "GET",
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
            })
            
            .then (response => response.json())
            .then (data => (this.comments = data))
            .catch(alert)
        },
        deleteComments(index) {
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment supprimer le commentaire") === true) {

                fetch(`http://localhost:3000/api/comments/${this.comments[index].id}`, {
                    method: "DELETE",
                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                    body : JSON.stringify(this.comments[index])
                })
                .then(response => response.json())
                .then(data => (this.comments[index] = data))
                .then(() => {
                    this.$router.go()
                })
                .catch(alert)
            }
        }
    },
    mounted(){
        this.getComments()
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

button {
    margin-top: 10px;
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
    }

    .button {
        margin-bottom: 50px;
        font-size: 0.8rem;
    }
}

</style>