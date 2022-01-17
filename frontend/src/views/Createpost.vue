<template>
    <div>
        <HeaderProfile />
            <section>
                <h1>Création d'un post</h1>
                <form>
                    <ul>
                        <li>
                            <input type="text" v-model="titre" placeholder="Titre" size="50" required aria-label="Titre du post">
                        </li>
                        <li v-if="image">
                            <img :src="image" alt="Image du post" class="file">
                        </li>
                        <li>
                            <label v-if="!image" for="file" class="label-file" aria-label="Choisir une photo pour ce post">Choisir une image</label>
                            <button v-else @click="deletefile()" class="label-file" aria-label="Supprimer cette photo du post"> Supprimer cette image</button>
                            <input type="file" accept="image/jpeg, image/jpg, image/png, image/webp" v-on:change="uploadFile" id="file" class="input-file" aria-label="Image du post">
                        </li>
                        <li>
                            <textarea v-model="contenu" placeholder="Contenu" rows="10" cols="60" required aria-label="Message du post"></textarea>
                        </li>
                    </ul>
                </form>
                <button @click="createPost()" class="button" aria-label="Créer ce post">Créer le post</button>
                <div>
                <router-link to="/allposts" class="button lien" aria-label="Retour au fil d'actualité">Retour aux posts</router-link>
                </div>
            </section>
        <Footer />
    </div>
</template>


<script>
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";

export default {
    name: 'createpost',
    components: {
        HeaderProfile,
        Footer
    },
    data() {
        return {
            titre: '',
            contenu: '',
            image: '',
            preview: null
        }
    },
    methods: {
        createPost() {
            const Id = JSON.parse(localStorage.getItem("userId"))
            const fileField = document.querySelector('input[type="file"]');
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (this.titre === '')
                alert("Veuillez remplir le titre")
            if (this.contenu === '')
                alert("Veuillez remplir le contenu du message")
            if (this.image === '' && this.titre != '' && this.contenu != '') {
                let data = new FormData()
                data.append('title', this.titre)
                data.append('content', this.contenu)
                data.append('user_id', Id)

                fetch("http://localhost:3000/api/posts", {
                    method: "POST",
                    headers: {
                    'authorization': `Bearer ${token}`
                    },
                    body: data
                })
                .then((response) => {
                    return response.json();
                })
                .then(() => {
                    this.$router.push("/allposts");
                    this.$router.go() })
                .catch(error => console.log(error))

            } else if (this.titre != '' && this.contenu != '') {
                let data = new FormData()
                data.append('image', fileField.files[0])
                data.append('title', this.titre)
                data.append('content', this.contenu)
                data.append('user_id', Id)

                fetch("http://localhost:3000/api/posts", {
                    method: "POST",
                    headers: {
                    'authorization': `Bearer ${token}`
                    },
                    body: data
                })
                .then((response) => response.json())
                .then(() => {
                    this.$router.push("/allposts");
                    this.$router.go()
                })
                .catch(error => console.log(error))
            }
        },
        uploadFile(e) {
            if (e.target.files) {
                let reader = new FileReader()
                reader.onload = (event) => {
                    this.preview = event.target.result
                    this.image = event.target.result
                }
                reader.readAsDataURL(e.target.files[0])
            }
        },
        deletefile() {
            this.image = '';
        }
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

ul {
    padding: 0;
}

li {
    margin: 30px 0;
    list-style-type: none;
}

input {
    height: 30px;
    font-size: 1.5rem;
}

.file {
    width: 300px;
    height: 300px;
    margin-top: 10px;
    border: 2px solid #fd2d01;
    border-radius: 30px;
    padding: 5px;
}

.input-file {
    display: none;
}

textarea {
    font-size: 1.3rem;

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

@media screen and (max-width:1024px) {

    h1 {
        font-size: 1.5rem;
    }
    
    input {
        font-size: 1rem;
    }

    textarea {
        font-size: 1rem;
    }

    ::placeholder {
        font-size: 1.5rem;
    }

    .file {
    height: 300px;
    }
}

@media screen and (max-width:768px) {

    h1 {
        font-size: 1.2rem;
    }

    input {
        font-size: 0.6rem;
    }

    textarea {
        font-size: 0.6rem;
    }

    .file {
    height: 200px;
    }

    ::placeholder {
        font-size: 1.2rem;
    }
}
</style>