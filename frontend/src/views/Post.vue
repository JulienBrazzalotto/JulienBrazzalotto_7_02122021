<template>
    <div>
        <HeaderProfile />
        <section>
            <article id="test">
                <h2>{{ post.title }}</h2>
                <p>Posté par <b>{{ post.user.nom }} {{ post.user.prenom }}</b> le <b>{{ dateFormat(post.date) }} à {{ hourFormat(post.date) }}</b></p>
                <p>{{ post.content }}</p>
                <button v-if="comments.length != 0" v-on:click="show">Voir les {{ comments.length }} commentaires</button>
                <div v-if="isDisplay" v-on:click="hide">
                    <div v-bind:key="index" v-for="(comment, index) in comments">
                        <p>écrit par {{ comment.user.nom }} {{ comment.user.prenom}} le <b>{{ dateFormat(comment.date) }} à {{ hourFormat(comment.date) }}</b></p>
                        <p>{{ comment.content }}</p>
                    </div>
                </div>
            </article>
        </section>
        <router-link to="/allposts">Retour aux posts</router-link>
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
        fetch(`http://localhost:3000/api/posts/${this.id_param}`)
        
        .then(response => response.json())
        .then(data => (this.post = data))
    },
    fetchComments() {
        fetch(`http://localhost:3000/api/comments/${this.id_param}`)
        
        .then(response => response.json())
        .then(data => (this.comments = data))
    },
    dateFormat(createdDate) {
        const date = new Date(createdDate)
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
        return date.toLocaleDateString('fr-FR', options);
    },
    hourFormat(createdHour) {
        const hour = new Date(createdHour)
        const options = { hour: 'numeric', minute:'numeric', second:'numeric'};
        return hour.toLocaleTimeString('fr-FR', options);
    }
  },
  mounted(){
        this.fetchPost()
        this.fetchComments()
  }
}
</script>