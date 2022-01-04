<template>
    <div>
        <HeaderProfile />
            <section>
                <article class="header">
                    <h1>Titre: {{ post.title }}</h1>
                    <p class="info">Posté par <b>{{ post.user.nom }} {{ post.user.prenom }}</b> le <b>{{ dateFormat(post.date) }} à {{ hourFormat(post.date) }}</b></p>
                </article>

                <article class="content">
                    <p class="modif">
                    <button @click="modifyPost()" class="button"><i class="fas fa-edit"></i> Modifier ce post</button>
                    <button @click="deletePost()" class="button espacement"><i class="far fa-trash-alt"></i> Supprimer ce post</button>
                    </p>
                    <hr>
                    <p class="message">Message: </p><br>
                    <img v-if="post.image" :src="post.image" :alt="post.title">
                    <p>{{ post.content }}</p>
                </article>

                <button v-if="comments.length != 0" v-on:click="show" class="comment-button">Voir {{ comments.length }} commentaire<span v-if="comments.length >= 2">s</span></button>
                <article v-if="displaycomments">
                    <div v-bind:key="index" v-for="(comment, index) in comments" class="comment">
                        <p class="comment-info">écrit par <b>{{ comment.user.nom }} {{ comment.user.prenom}}</b> le <b>{{ dateFormat(comment.date) }} à {{ hourFormat(comment.date) }}</b><br>
                        <button @click="deleteComment(index)" class="button-comment"><i class="far fa-trash-alt"></i></button>
                        </p>
                        <hr>
                        <p class="comment-content">{{ comment.content }}</p>
                    </div>
                    <button v-on:click="hide" class="comment-button">Cacher le<span v-if="comments.length >= 2">s</span> commentaire<span v-if="comments.length >= 2">s</span></button>
                </article>

                <button v-on:click="show2" class="button">Ecrire un commentaire</button>
                <article v-if="displayCreateComment" class="createcomment">
                    <textarea v-model="commentaire" placeholder="Commentaire" cols="60" rows="5"></textarea>
                    <button @click="createComment()" class="buttonenvoyer">Envoyer le commentaire</button>
                    <button v-on:click="hide2" class="buttonannuler">Annuler le commentaire</button>
                </article>

            </section>
            <router-link to="/allposts" class="button link">Retour aux posts</router-link>
        <Footer />
    </div>
</template>

<script>
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";

export default {
    name: 'Post',
    components: {
        HeaderProfile,
        Footer
    },
    data () {
        return {
            id_param: this.$route.params.id,
            post: {
                content:'',
                date:'',
                id:'',
                image:'',
                title:'',
                user: {},
                user_id:''
            },
            comments: [],
            displaycomments: false,
            displayCreateComment: false,
            commentaire:''
        }
    },
    methods : {
        show: function () {
            return this.displaycomments = true;
        },
        hide: function () {
            return this.displaycomments = false;
        },
        show2: function () {
            return this.displayCreateComment = true;
        },
        hide2: function () {
            return this.displayCreateComment = false;
        },
        
        getPost() {
            fetch (`http://localhost:3000/api/posts/${this.id_param}`)
            
            .then (response => response.json())
            .then (data => (this.post = data))
        },
        
        getComments() {
            fetch (`http://localhost:3000/api/comments/${this.id_param}`)
            
            .then (response => response.json())
            .then (data => (this.comments = data))
        },
        dateFormat (createdDate) {
            const date = new Date(createdDate)
            const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
            return date.toLocaleDateString('fr-FR', options);
        },
        hourFormat (createdHour) {
            const hour = new Date(createdHour)
            const options = { hour: 'numeric', minute:'numeric', second:'numeric'};
            return hour.toLocaleTimeString('fr-FR', options);
        },
        deletePost () {

            if (confirm("Voulez-vous vraiment supprimer le post") === true) {

                fetch(`http://localhost:3000/api/posts/${this.id_param}`, {
                    method: "DELETE",
                })
                .then(response => response.json())
                .then(() => { 
                    alert("La suppression du post est bien prise en compte")
                    this.$router.push("/allposts") })
            }
        },
        modifyPost () {
            this.$router.push(`/modifypost/${this.id_param}`)
        },
        createComment () {
            const Id = localStorage.userId;
            let data = {
                content: this.commentaire,
                post_id: this.id_param,
                user_id: Id
            }
            if( this.commentaire === ""){
                alert('Veuillez remplir votre commentaire')
            } else {
                fetch("http://localhost:3000/api/comments", {
                    method: "POST",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => {
                    return response.json();
                })
                .then(() => {
                    alert("Votre commentaire est bien pris en compte")
                    this.$router.go()
                })
                .catch(error => console.log(error))
            }
        },
        deleteComment (index) {

            if (confirm("Voulez-vous vraiment supprimer ce commentaire") === true) {

                fetch(`http://localhost:3000/api/comments/${this.comments[index].id}`, {
                    method: "DELETE",
                })
                .then(response => response.json())
                .then(() => { 
                    alert("La suppression du commentaire est bien prise en compte")
                    this.$router.go() })
            }
        }
    },
    mounted(){
            this.getPost ()
            this.getComments ()
    }
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    font-size: 1.5rem;
    margin: 30px 0 10px 0;
}

textarea {
    font-size: 1.2rem;
}

.header,
.content {
    width: 50%;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
}

.info {
    font-size: 0.8rem;
}

.modif {
    vertical-align: middle;
    margin: 0;
}

.message {
    text-decoration: underline;
}

.content {
    margin-bottom: 30px;
}

.createcomment {
    display: flex;
    flex-direction: column;
}

.button {
    margin: 10px 0 30px 0;
    padding: 5px 30px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1rem;
    cursor: pointer;
}

.buttonenvoyer,
.buttonannuler {
    margin: 10px 0 10px 0;
    padding: 5px 30px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1rem;
    cursor: pointer;
}

.buttonannuler{
    margin-bottom: 40px;
}

.button-comment {
    margin: 10px 0 10px 10px;
    padding: 5px 5px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1rem;
    cursor: pointer;
}

.espacement {
    margin: 0 0 0 10px;
}

.link {
    text-decoration: none;
    color: #000000;
}

.comment-button {
    margin: 10px 0 30px 0;
    padding: 5px 30px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1rem;
    cursor: pointer;
}

.comment {
    border: 2px solid #000000;
    border-radius: 20px;
    margin-bottom: 20px;
}

.comment-info,
.comment-content {
    padding: 0 30px 0 30px;
}

</style>