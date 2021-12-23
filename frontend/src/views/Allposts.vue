<template>
  <div>
    <HeaderProfile />
      <section>
          <article v-if="posts.length == 0">
            <p>Désolé il n'y a aucune publication pour le moment...</p>
          </article>
          <article v-else v-bind:key="index" v-for="(post, index) in posts">
              <div>
                <h2>{{ post.title }}</h2>
                <p>Posté par {{ post.user.nom }} {{ post.user.prenom }} {{ post.date }}</p>
                <p>{{ post.content }}</p>
              </div>
        </article>
      </section>
    <Footer />
  </div>
</template>

<script>
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";

export default {
  name: 'allposts',
  components: {
    HeaderProfile,
    Footer
  },
  data () {
    return {
      posts: [],
    }
  },
  methods : {

    fetchPosts() {
            fetch('http://localhost:3000/api/posts/')
            
            .then(response => response.json())
            .then(data => (this.posts = data));
            
    }
  },
  mounted(){
        this.fetchPosts()
  }
}


</script>