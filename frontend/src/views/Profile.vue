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
      const Id = localStorage.userId;

      fetch(`http://localhost:3000/api/auth/${Id}`) 
        .then(response => response.json())
        .then(data => (this.user = data))
      
    },
    updateUser() {
      const Id = localStorage.userId;

      const regexText = /^[a-zA-Z-\s]+$/;
      const regexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/; // eslint-disable-line
      

      if (this.user.nom === "") {
          alert("Veuillez remplir votre nom");
      } else if (regexText.test(this.user.nom) === false) {
          alert("Veuillez vérifier que l'écriture de votre nom soit uniquement en lettre");}

      if (this.user.prenom === "") {
          alert("Veuillez remplir votre prénom");
      } else if (regexText.test(this.user.prenom) === false) {
          alert("Veuillez vérifier que l'écriture de votre prénom soit uniquement en lettre");}

      if (this.user.email === "") {
          alert("Veuillez remplir votre adresse email");
      } else if (regexEmail.test(this.user.email) === false) {
          alert("Veuillez écrire une adresse email valide");
      } else if ((regexText.test(this.user.nom) === true) && regexText.test(this.user.prenom) === true && regexEmail.test(this.user.email) === true) {
      
          fetch(`http://localhost:3000/api/auth/${Id}`, {
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
      }
    },
    deleteUser() {
      const Id = localStorage.userId;

      fetch(`http://localhost:3000/api/auth/${Id}`, {
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