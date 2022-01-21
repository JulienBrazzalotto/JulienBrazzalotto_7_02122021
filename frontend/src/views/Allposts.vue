<template>
    <div>
        <HeaderProfile />
        <h1>Fil d'actualité</h1>
        <button @click="createPost()" class="button" >Créer un post</button>
        <div>
            <input v-model="search" class="search" type="search" placeholder="Rechercher un post avec son auteur ..." size=50 aria-label="Barre de recherche d'un post avec le nom">
        </div>
        <article v-if="posts.length == 0">
            <p>Désolé il n'y a aucune publication...</p>
        </article>
        <article v-else v-bind:key="index" v-for="(post, index) in filterList">
            <router-link :to="`/post/${post.id}`" class="article">
                <div class="header">
                    <div>
                        <h2>{{ post.title }}</h2>
                        <p class="info">
                            Posté par 
                            <b>{{ post.user.nom }} 
                            <span v-if="post.user.role != 0">{{ post.user.prenom }} </span></b>
                            <img class="photo-profil" v-if="post.user.image" :src="post.user.image" alt="photo de profil">
                            <img class="photo-profil" v-else src="../assets/images/photo-profil.jpg" alt="photo de profil"><br>
                            le <b>{{ dateFormat(post.created_date) }}</b>
                            à <b>{{ hourFormat(post.created_date) }}</b>
                        </p>
                        <p v-if="post.created_date != post.updated_date"  class="info">
                            Modifié 
                            le <b>{{ dateFormat(post.updated_date) }}</b>
                            à <b>{{ hourFormat(post.updated_date) }}</b>
                        </p>
                    </div>
                </div>
                <div class="content">
                    <p class="message"></p><br>
                    <img class="image" v-if="post.image" :src="post.image" :alt="post.title">
                    <p class="text">{{ post.content }}</p>
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
            search:''
        }
    },
    computed : {
        filterList() {
            return this.posts.filter((post) =>{
                return post.user.nom.toLowerCase().includes(this.search.toLowerCase());
            })
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
            .catch(error => console.log(error))
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
    width: 98%;
    margin: 20px 0 20px 5px;
    font-size: 1.7vw;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
    border-radius: 20px;
}

h2 {
    font-size: 1.3vw;
    margin: 30px 0 10px 0;
}

.info {
    font-size: 0.8vw;
}

.image {
    height: 15vw;
    border-radius: 30px;
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
    width: 40%;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
}

.header {
    border-radius: 20px 20px 0 0;
}

.content {
    margin-bottom: 30px;
    border-radius: 0 0 20px 20px;
}

.button {
    margin: 10px 0 20px 0;
    padding: 5px 40% ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 15px;
    cursor: pointer;
}

.search {
    margin-bottom: 50px;
    width: 25vw;
    height: 2vw;
    border: 2px solid #fd2d01;
    border-radius: 5px;
}

::placeholder {
    text-align: center;
    font-size: 1.3vw;
}

.photo-profil {
    width: 50px;
    height: 50px;
    border: 2px solid #fd2d01;
    border-radius: 30px;
}

.text {
    font-size: 1vw;
}

@media screen and (max-width:1024px) {

    h1 {
        font-size: 1.7rem;
    }

    h2 {
        font-size: 1.5rem;
        margin: 20px 0 10px 0;
    }

    .info {
        font-size: 0.9rem;
    }

    .image {
        height: 30vw;
    }

    .header,
    .content {
        width: 70%;
    }

    .text {
        font-size: 2.5vw;
    }

    .search {
        width: 50%;
        height: 30px;
        margin-bottom: 50px;
    }

    ::placeholder {
        font-size: 20px;
    }

    .article {
        width: 100%;
    }

    .photo-profil{
        width: 50px;
    }
}

@media screen and (max-width:768px) {

    h1 {
        width: 98%;
        margin-left: 5px;
        font-size: 1.2rem;
    }

    .button {
        font-size: 10px;
    }

    .header,
    .content {
        width: 98%;
    }

    .text {
        font-size: 1.4rem;
    }

    .image {
        height: 40vw;
    }

    .search{
        width: 50%;
        height: 30px;
        font-size: 3vw;
    }
    ::placeholder {
        font-size: 1rem;
    }
}
</style>