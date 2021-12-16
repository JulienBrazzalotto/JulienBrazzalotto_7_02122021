<template>
  <div class="login">
    <h2>Se connecter</h2>
    <form>
      <ul>
        <li>
          <input type="email" v-model="email" class="email" placeholder="Email" size="50" required>
        </li>
        <li>
          <input type="password" v-model="password" class="password" placeholder="Password" size="50" required>
        </li>
      </ul>  
    </form>
    <button @click="submit()" type="submit">Se connecter</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    submit() {
        
      let data = {
          email: this.email,
          password: this.password
      };

        fetch("http://localhost:3000/api/auth/login",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        
        .then(response => {
          if(response.ok) {
           return response.json()
          } else {
            return response.text()
            .then((text) => {
              throw new Error(text)}
            )
          }
        })  
          
        .then((value) => {
          const user = JSON.stringify(value.token);
          localStorage.setItem("user", user);
          this.$router.push("/allposts");
          }
        )

        .catch(alert)
    }
  }
}
</script>






<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

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
  margin-top: 30px;
  padding: 5px 30px ;
  border: 2px solid #fd2d01;
  border-radius: 10px;
  background: #ffd7d7;
  font-size: 1rem;
  cursor: pointer;
}

::placeholder {
  text-align: center;
}
</style>