<template>
    <div>
        <HeaderProfile />
            <article>
                <div class="header">
                    <h1>Titre: {{ post.title }}</h1>
                    <p class="info">Posté par <b>{{ post.user.nom }} {{ post.user.prenom }}</b> le <b>{{ dateFormat(post.date) }} à {{ hourFormat(post.date) }}</b></p>
                </div>
                <div class="content">
                    <p>{{ post.content }}</p>
                </div>
                <button v-if="comments.length != 0" v-on:click="show" class="comment-button">Voir les {{ comments.length }} commentaires</button>
                <div v-if="isDisplay" v-on:click="hide">
                    <div v-bind:key="index" v-for="(comment, index) in comments" class="comment">
                        <p class="comment-info">écrit par {{ comment.user.nom }} {{ comment.user.prenom}} le <b>{{ dateFormat(comment.date) }} à {{ hourFormat(comment.date) }}</b></p>
                        <hr>
                        <p class="comment-content">{{ comment.content }}</p>
                    </div>
                </div>
            </article>
            <router-link to="/allposts" class="button link">Retour aux posts</router-link>
            <button @click="deletePost()" class="button">Supprimer ce post</button>
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
            post: [],
            comments: {},
            isDisplay: false
        }
    },
    methods : {
        show: function () {
        return this.isDisplay = true;
        },
        hide: function () {
        return this.isDisplay = false;
        },
        
        fetchPost() {
            fetch (`http://localhost:3000/api/posts/${this.id_param}`)
            
            .then (response => response.json())
            .then (data => (this.post = data))
        },
        fetchComments() {
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
            fetch(`http://localhost:3000/api/posts/${this.id_param}`, {
                method: "DELETE",
            })
            .then(response => response.json())
            .then(() => { alert("La suppression du post est bien prise en compte") })
            .then(this.$router.push("/allposts"))
        }
    },
    mounted(){
            this.fetchPost ()
            this.fetchComments ()
    }
}
</script>

<style scoped>
article {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    font-size: 1.5rem;
    margin: 30px 0 10px 0;
}

.header,
.content {
    width: 50%;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
}

.info {
    font-size: 0.8rem;
    padding-bottom: 10px;
}

.content {
    height: 100px;
    margin-bottom: 30px;
    padding: 40px 0 0 0;
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