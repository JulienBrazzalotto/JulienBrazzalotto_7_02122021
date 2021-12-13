<template>
  <div class="login">
    <h2>Se connecter</h2>
    <form>
      <ul>
        <li>
          <label for="email">Email</label>
          <input type="email" name="email" class="email" placeholder="Email" size="50" required>
        </li>
        <li>
          <label for="password">Password</label>
          <input type="password" name="password" class="password" placeholder="Password" size="50" required>
        </li>
      </ul>  
    </form>
    <button type="submit">Se connecter</button>
  </div>
</template>







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

.email,
.password {
  margin: 30px 0 0 20px;
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
</style>