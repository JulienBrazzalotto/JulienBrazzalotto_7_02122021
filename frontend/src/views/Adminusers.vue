<template>
    <div>
        <HeaderProfile />
        <AdminNav />
            <article >
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    <tr v-bind:key="index" v-for="(user, index) in users">
                        <td><input type="text" v-model="user.nom" placeholder="Nom" required></td>
                        <td><input type="text" v-model="user.prenom" placeholder="Prénom" required></td>
                        <td><input type="text" v-model="user.email" placeholder="Email" required></td>
                        <td><input type="text" v-model="user.role" placeholder="Role" required></td>
                        <button @click="modifyUser(index)"><i class="fas fa-edit"></i></button>
                        <button @click="deleteUser(index)"><i class="far fa-trash-alt"></i></button>
                    </tr>
                </table>
                <router-link to="/allposts" class="button">Retour aux posts</router-link>
            </article>
        <Footer />
    </div>
</template>

<script>
import HeaderProfile from "../components/HeaderProfile";
import AdminNav from "../components/AdminNav";
import Footer from "../components/Footer";

export default {
    name: 'AdminUsers',
    components: {
        HeaderProfile,
        AdminNav,
        Footer
    },
    data () {
        return {
            users: []
        }
    },
    methods : {
        getUsers() {
            const token = JSON.parse(localStorage.getItem("userToken"))

            fetch('http://localhost:3000/api/auth/', {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            
            .then(response => response.json())
            .then(data => (this.users = data))
        },
        deleteUser(index) {
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment supprimer cet utilisateur") === true) {

                fetch(`http://localhost:3000/api/auth/${this.users[index].id}`, {
                    method: "DELETE",
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(() => { 
                    alert("La suppression de l'utilisateur est bien prise en compte")
                    this.$router.go() })
            }
        },
        modifyUser(index) {
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment modifier cet utilisateur") === true) {
                

                fetch(`http://localhost:3000/api/auth/admin/${this.users[index].id}`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                    body : JSON.stringify(this.users[index])
                })
                .then(response => response.json())
                .then(data => (this.users[index] = data))
                .then(() => { 
                    alert("La modification de l'utilisateur est bien prise en compte")
                    this.$router.go() })
            }
        }
    },
    mounted(){
        this.getUsers()
    }
}
</script>

<style scoped>
table {
    width: 100%;
    font-size: 1rem;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
    border-radius: 20px;
    margin: 0 0 30px 0;
}

.button{
margin: 10px 0 30px 0;
    padding: 5px 30px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    color: #000000;
}

button {
    padding: 5px 5px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    color: #000000;
}
</style>