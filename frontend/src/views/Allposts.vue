<template>
  <div>
    <HeaderProfile />
      <section>
          <article v-if="posts.length == 0">
            <p>Désolé il n'y a aucune publication pour le moment...</p>
          </article>
          <article v-else v-bind:key="index" v-for="(post, index) in posts">
              <router-link :to="`/post/${post.id}`">
                <h2>{{ post.title }}</h2>
                <p>Posté par <b>{{ post.user.nom }} {{ post.user.prenom }}</b> le <b>{{ dateFormat(post.date) }} à {{ hourFormat(post.date) }}</b></p>
                <p>{{ post.content }}</p>
              </router-link>
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
      posts: '',
      
    }
  },
  methods : {
      
    fetchPosts() {
        fetch('http://localhost:3000/api/posts/')
        
        .then(response => response.json())
        .then(data => (this.posts = data))
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
        this.fetchPosts()
  }
}


</script>