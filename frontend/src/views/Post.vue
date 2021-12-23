<template>
  <div>
    <HeaderProfile />
      <section>
          <article>
                <h2>{{ post.title }}</h2>
                <p>Posté par {{ post.user.nom }} {{ post.user.prenom }} {{ post.date }}</p>
                <p>{{ post.content }}</p>
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
    }
  },
  methods : {
      
    fetchPost() {
        fetch(`http://localhost:3000/api/posts/${this.id_param}`)
        
        .then(response => response.json())
        .then(data => (this.post = data))
    }
  },
  mounted(){
        this.fetchPost()
  }
}
</script>