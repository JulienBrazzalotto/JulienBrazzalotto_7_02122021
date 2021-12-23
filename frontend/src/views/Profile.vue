<template>
    <div>
        <HeaderProfile />
        <div>
            <form>
                <div>
                    <input type="text" v-model="user.nom" placeholder="Nom" size="50" required>
                </div>
                <div>
                    <input type="text" v-model="user.prenom" placeholder="Prenom" size="50" required>
                </div>
                <div>
                    <input type="email" v-model="user.email" placeholder="Email" size="50" required>
                </div>
                <div>
                  <button @click="updateUser()">Enregistrer les modifications</button>
                  <button @click="deleteUser()">Supprimer le compte</button>
                </div>
                
            </form>
        </div>
        <router-link to="/allposts">Retour aux posts</router-link>
        <Footer />
    </div>
</template>

<script>
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";

export default {
  name: 'Profile',
  components: {
    HeaderProfile,
    Footer
  },
  data() {
    return {
      user: {
        id: '',
        nom: '',
        prenom: '',
        email: '',
      }
      
    }
  },
  mounted () {
    this.getUser();
    
  },
  methods: {
    getUser() {
      const userId = localStorage.userId;

      fetch(`http://localhost:3000/api/auth/${userId}`) 
        .then(response => response.json())
        .then(data => (this.user = data))
      
    },
    updateUser() {
      const userId = localStorage.userId;
      
      fetch(`http://localhost:3000/api/auth/${userId}`, {
        method: "PUT",
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.user)
      })
        .then(response => response.json())
        .then(data => (this.user = data))
        .then(() => {
          alert("Votre modification est bien prise en compte")
          this.$router.go();
        })
    },
    deleteUser() {
      const userId = localStorage.userId;

      fetch(`http://localhost:3000/api/auth/${userId}`, {
        method: "DELETE",
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.user)
      })
        .then(response => response.json())
        .then(() => { alert("La suppression du compte est bien prise en compte") })
        .then(this.$router.push("/"))
        
    }
  }
}
</script>