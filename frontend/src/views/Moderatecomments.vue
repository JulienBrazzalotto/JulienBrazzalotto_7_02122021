<template>
    <div>
        <HeaderProfile />
        <AdminNav />
            <article >
                <div class="filter">
                    <label for="moderate" v-if="moderate === false">Cochez pour afficher les commentaires non modérés</label>
                    <label for="moderate" v-if="moderate === true">Décochez pour afficher tous les commentaires</label><br>
                    <input v-model="moderate" type="checkbox" id="moderate" class="moderate" name="moderate">
                </div>
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Titre du post</th>
                        <th>Commentaire</th>
                        <th>Modération</th>
                    </tr>
                    <tr v-bind:key="index" v-for="(comment, index) in filterList">
                        <td><input type="text" v-model="comment.user.nom" required aria-label="Nom de l'auteur du commentaire"></td>
                        <td><input type="text" v-model="comment.user.prenom" required aria-label="Prénom de l'auteur du commentaire"></td>
                        <td><input type="text" v-model="comment.post.title" required aria-label="Titre du post"></td>
                        <td><textarea type="text" v-model="comment.content" rows="3" cols="50" required aria-label="Commentaire"></textarea></td>
                        <td>
                            <button @click="moderateComments(index)" aria-label="Modérer ce commentaire" v-if="comment.moderate === false"><i class="fas fa-check"></i></button>
                            <button @click="deleteComments(index)" aria-label="Supprimer ce commentaire"><i class="fas fa-times"></i></button>
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
    name: 'ModerateComments',
    components: {
        HeaderProfile,
        AdminNav,
        Footer
    },
    data () {
        return {
            comments: [],
            moderate: true
        }
    },
    computed : {
        filterList() {
            return this.comments.filter((comment) =>{
                if (comment.moderate === true) {
                    return comment.moderate != this.moderate;
                } else {
                    return comment
                }
            })
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
        moderateComments(index) {
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment valider ce commentaire") === true) {
                let data = {
                    moderate: true
                }
                
                fetch(`http://localhost:3000/api/comments/${this.filterList[index].id}`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data) 
                })
                .then((response) => response.json())
                .then(data => (this.filterList[index] = data))
                .then(() => {
                    this.$router.go()
                })
                .catch(alert)
            }
        },
        deleteComments(index) {
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment supprimer ce commentaire") === true) {

                fetch(`http://localhost:3000/api/comments/${this.filterList[index].id}`, {
                    method: "DELETE",
                    headers: {
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

    table,
    .filter {
        width: 98%;
        margin-left: 5px;
    }

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
    }

    .button {
        margin-bottom: 50px;
        font-size: 0.8rem;
    }
}

</style>