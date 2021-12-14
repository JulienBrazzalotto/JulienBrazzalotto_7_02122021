<template>
  <div class="login">
    <h2>Inscription</h2>
    <form>
      <ul>
        <li>
          <label for="nom">Nom :</label>
          <input type="text" v-model="nom" class="input" placeholder="Nom" size="50" required>
        </li>
        <li>
          <label for="prenom">Prénom :</label>
          <input type="text" v-model="prenom" class="input" placeholder="Prénom" size="50" required>
        </li>
        <li>
          <label for="email">Email :</label>
          <input type="email" v-model="email" class="input" placeholder="Email" size="50" required>
        </li>
        <li>
          <label for="password">Password :</label>
          <input type="password" v-model="password" class="input" placeholder="Password" size="50" required>
        </li>
      </ul>
    </form>   
    <button @click="submit()" type="submit">S'inscrire</button>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      nom: '',
      prenom: '',
      image: '',
      email: '',
      password: '',
    }
  },

  methods: {
    submit() {
      let data = {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          password: this.password
      };

      fetch("http://localhost:3000/api/auth/signup", {

          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(function(response){
          return response.json(); 
      })

      .catch(error => console.log(error))

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
  margin-top: 60px;
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

</style>