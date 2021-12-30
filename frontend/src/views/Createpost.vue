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
            contenu: ''
        }
    },
    methods: {
        createPost() {
            const Id = localStorage.userId;
            let data = {
                title: this.titre,
                content: this.contenu,
                user_id: Id
            }

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
        },
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

li {
    
    margin: 30px;
    list-style-type: none;
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