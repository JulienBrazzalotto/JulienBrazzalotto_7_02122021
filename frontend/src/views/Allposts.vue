<template>
    <div>
        <HeaderProfile />
            <h1>Fil d'actualité</h1>
            <button @click="createPost()" class="button" >Créer un post</button>
            <article v-if="posts.length == 0">
                <p>Désolé il n'y a aucune publication pour le moment...</p>
            </article>
            <article v-else v-bind:key="index" v-for="(post, index) in posts">
                <router-link :to="`/post/${post.id}`" class="article">
                    <div class="header">
                    <h2>{{ post.title }}</h2>
                    <p>Posté par <b>{{ post.user.nom }} <span v-if="post.user.role != 0">{{ post.user.prenom }}</span></b> le <b>{{ dateFormat(post.date) }} à {{ hourFormat(post.date) }}</b></p>
                    </div>
                    <div class="content">
                    <p class="message"></p><br>
                    <img v-if="post.image" :src="post.image" alt="">
                    <p>{{ post.content }}</p>
                    </div>
                </router-link>
            </article>
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
        },
        createPost () {
            this.$router.push("/createpost")
        }
    },
    mounted(){
        this.getPosts()
    }
}
</script>

<style scoped>

h1 {
    width: 100%;
    font-size: 2rem;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
    border-radius: 20px;
}

h2 {
    font-size: 1.5rem;
    margin: 30px 0 10px 0;
}

.article {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #000000;
}

.header,
.content {
    width: 50%;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
}

.header {
    border-radius: 20px 20px 0 0;
}

.message {
    text-decoration: underline;
}

.content {
    margin-bottom: 30px;
    border-radius: 0 0 20px 20px;
}

.button {
    margin: 10px 0 50px 0;
    padding: 5px 300px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1rem;
    cursor: pointer;
}

img {
    height: 400px;
}
</style>