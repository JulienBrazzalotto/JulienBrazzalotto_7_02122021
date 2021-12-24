<template>
    <div>
        <HeaderProfile />
        <section>
            <article>
                <h2>{{ post.title }}</h2>
                <p>Posté par <b>{{ post.user.nom }} {{ post.user.prenom }}</b> le <b>{{ dateFormat(post.date) }} à {{ hourFormat(post.date) }}</b></p>
                <p>{{ post.content }}</p>
                <div>
                    <p>{{ comments }}</p>
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
        post: '',
        comments: '',
    }
  },
  methods : {
      
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