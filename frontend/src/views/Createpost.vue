<template>
    <div>
        <HeaderProfile />
            <section>
                <h1>Création d'un post</h1>
                <form>
                    <ul>
                        <li>
                            <input type="text" v-model="titre" placeholder="Titre" size="50" required>
                        </li>
                        <li>
                            <label for="file" class="label-file">Choisir une image</label>
                            <input type="file" accept="image/jpeg, image/jpg, image/png, image/webp" ref="file" v-on:change="uploadFile" id="file" class="input-file">
                            <img :src="image" alt="">
                        </li>
                        <li>
                            <textarea v-model="contenu" placeholder="Contenu" rows="10" cols="60" required></textarea>
                        </li>
                    </ul>
                </form>
                <button @click="createPost()" class="button">Créer le post</button>
                <div>
                <router-link to="/allposts" class="button lien">Retour aux posts</router-link>
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
            const Id = localStorage.userId;
            const fileField = document.querySelector('input[type="file"]');
            if (this.titre === '')
                alert("Veuillez remplir le titre")
            if (this.contenu === '')
                alert("Veuillez remplir le contenu du message")
            if (this.image === '' && this.titre != '' && this.contenu != '') {
                let data = {
                    title: this.titre,
                    content: this.contenu,
                    user_id: Id
                }
                console.log("this.image : " + this.image)

                fetch("http://localhost:3000/api/posts", {
                    method: "POST",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => {
                    return response.json();
                })
                .catch(error => console.log(error))

                this.$router.push("/allposts");
                this.$router.go()
            } else if (this.titre != '' && this.contenu != '') {
                let data = new FormData()
                data.append('image', fileField.files[0])
                data.append('title', this.titre)
                data.append('content', this.contenu)
                data.append('user_id', Id)
                console.log(this.image)
                console.log(data)

                fetch("http://localhost:3000/api/posts", {
                    method: "POST",
                    body: data
                })
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                })
                .catch(error => console.log(error))

                this.$router.push("/allposts");
                this.$router.go()
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
    margin: 30px;
    list-style-type: none;
}

input {
    height: 30px;
    font-size: 1.5rem;
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
</style>