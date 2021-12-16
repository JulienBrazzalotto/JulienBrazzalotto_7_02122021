<template>
  <div class="login">
    <h2>Inscription</h2>
    <form>
      <ul>
        <li>
          <input type="text" v-model="nom" class="input" placeholder="Nom" size="50" required>
        </li>
        <li>
          <input type="text" v-model="prenom" class="input" placeholder="Prénom" size="50" required>
        </li>
        <li>
          <input type="email" v-model="email" class="input" placeholder="Email" size="50" required>
        </li>
        <li>
          <input type="password" v-model="password" class="input" placeholder="Password" size="50" required>
        </li>
      </ul>
    </form>   
    <button @click="signup()" type="submit">S'inscrire</button>
  </div>
</template>

<script>

export default {
  name: 'signup',
  data() {
    return {
      nom: '',
      prenom: '',
      email: '',
      password: '',
    }
  },

  methods: {
    signup() {
      let data = {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          password: this.password
      };

      const regexText = /^[a-zA-Z-\s]+$/;
      const regexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/; // eslint-disable-line
      const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{3,50}$/;

      if (this.nom === "") {
          alert("Veuillez remplir votre nom");
      } else if (regexText.test(this.nom) === false) {
          alert("Veuillez vérifier que l'écriture de votre nom soit uniquement en lettre");}
      
      if (this.prenom === "") {
          alert("Veuillez remplir votre prénom");
      } else if (regexText.test(this.prenom) === false) {
          alert("Veuillez vérifier que l'écriture de votre prénom soit uniquement en lettre");}

      if (this.email === "") {
          alert("Veuillez remplir votre adresse email");
      } else if (regexEmail.test(this.email) === false) {
          alert("Veuillez écrire une adresse email valide");}

      if (this.password === "") {
          alert("Veuillez remplir votre mot de passe");
      } else if (regexPassword.test(this.password) === false) {
          alert("Veuillez vérifier l'écriture de votre mot de passe, il doit contenir au moins une majuscule, une minuscule ainsi qu'un chiffre");

      }else if ((regexText.test(this.nom) === true) || regexText.test(this.prenom) === true || regexEmail.test(this.email) === true || regexPassword.test(this.password) === true ) {
          alert("Votre inscription est bien prise en compte");

          fetch("http://localhost:3000/api/auth/signup", {
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

          this.$router.push("/login");
          

      }
    }
  }
}
</script>



<style scoped>

h2 {
  width: 30%;
  border: 2px solid #fd2d01;
  border-radius: 5px;
  font-size: 1.5rem;
}

ul {
list-style: none;
padding: 0;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 30px;
}

button {
  margin-top: 10px;
  padding: 5px 30px ;
  border: 2px solid #fd2d01;
  border-radius: 10px;
  background: #ffd7d7;
  font-size: 1rem;
  cursor: pointer;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

::placeholder {
  text-align: center;
}

</style>