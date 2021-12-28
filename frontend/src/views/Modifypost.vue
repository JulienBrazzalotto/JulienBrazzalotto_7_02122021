<template>
    <div>
        <HeaderProfile />
            <section>
                <h1>Modification du post</h1>
                <form>
                    <ul>
                        <li>
                            <label for="titre">Titre</label>
                            <input type="text" v-model="post.title" placeholder="Titre" size="50" required>
                        </li>
                        <li>
                            <label for="message">Message</label>
                            <textarea v-model="post.content" placeholder="Contenu" rows="10" cols="60" required></textarea>
                        </li>
                    </ul>
                </form>
                <button @click="modifyPost()" class="button">Modifier le post</button>
            </section>
            <div>
            <router-link :to="`/post/${this.id_param}`" class="button lien">Retour au post</router-link>
            </div>
        <Footer />
    </div>
</template>

<script>
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";

export default {
    name: 'modifypost',
    components: {
        HeaderProfile,
        Footer
    },
    data () {
        return {
            id_param: this.$route.params.id,
            post: []
        }
    },
    methods: {
        getPost() {
            fetch (`http://localhost:3000/api/posts/${this.id_param}`)
            
            .then (response => response.json())
            .then (data => (this.post = data))
        },
        modifyPost() {

            if (this.post.title === "")
                alert("Veuillez remplir le titre");

            if (this.post.content === "") {
                alert("Veuillez remplir votre message");
            } else if ((this.post.title != "") && (this.post.content) != "") {
            
                fetch(`http://localhost:3000/api/posts/${this.id_param}`, {
                    method: "PUT",
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.post)
                })
                    .then(response => response.json())
                    .then(data => (this.post = data))
                    .then(() => {
                    alert("Votre modification est bien prise en compte")
                    this.$router.push(`/post/${this.id_param}`);
                    })
            }
            },
    },
    mounted () {
        this.getPost()
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

label {
    font-size: 1.3rem;
}

ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
}

li {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin-bottom: 30px
}

input {
    height: 30px;
    font-size: 1.5rem;
}

textarea {
    font-size: 1.3rem;

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

.lien {
    text-decoration: none;
    color: #000000;
}

</style>