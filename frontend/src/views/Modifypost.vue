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
                        <li v-if="post.image">
                            <img :src="post.image" :alt="post.titre" class="file">
                        </li>
                        <li>
                            <label v-if="!post.image " for="file" class="label-file">Choisir une image</label>
                            <button v-else @click="deletefile()" class="label-file"> Supprimer cette image</button>
                            
                            <input type="file" accept="image/jpeg, image/jpg, image/png, image/webp" ref="file" v-on:change="uploadFile" id="file" class="input-file">
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
            post: [],
            preview: null
        }
    },
    methods: {
        getPost() {
            fetch (`http://localhost:3000/api/posts/${this.id_param}`)
            
            .then (response => response.json())
            .then (data => (this.post = data))
        },
        modifyPost() {
            const fileField = document.querySelector('input[type="file"]');

            if (this.post.title === "")
                alert("Veuillez remplir le titre");

            if (this.post.content === "")
                alert("Veuillez remplir votre message");
            if (this.post.image === null && this.post.title != "" && this.post.content != "") {
            
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
            } else if (this.post.title != "" && this.post.content != "") {
                let data = new FormData()
                data.append('image', fileField.files[0])
                data.append('title', this.post.title)
                data.append('content', this.post.content)

                fetch(`http://localhost:3000/api/posts/${this.id_param}`, {
                    method: "PUT",
                    body: data
                })
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                    this.$router.push(`/post/${this.id_param}`);
                })
                .catch(error => console.log(error))
            }
        },
        uploadFile(e) {
            if (e.target.files) {
                let reader = new FileReader()
                reader.onload = (event) => {
                    this.preview = event.target.result
                    this.post.image = event.target.result
                }
                reader.readAsDataURL(e.target.files[0])
            }
        },
        deletefile() {
            this.post.image = '';
        }
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
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 0;
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

.input-file {
    display: none;
}

.button,
.label-file {
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

img {
    height: 400px;
}

</style>