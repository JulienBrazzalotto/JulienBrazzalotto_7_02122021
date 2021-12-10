<template>
  <div class="login">
    <h2>Inscription</h2>
    <form>
      <ul>
        <li>
          <label for="nom">Nom</label>
          <input type="text" name="nom" class="nom" placeholder="Nom" required>
        </li>
        <li>
          <label for="prenom">Prénom</label>
          <input type="text" name="prenom" class="prenom" placeholder="Prénom" required>
        </li>
        <li>
          <label for="email">Email</label>
          <input type="email" name="email" class="email" placeholder="Email" required>
        </li>
        <li>
          <label for="password">Password</label>
          <input type="password" name="password" class="password" placeholder="Password" required>
        </li>
        <li>
          <button type="submit">S'inscrire</button>
        </li>
      </ul>
    </form>
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
.password,
.nom,
.prenom {
  margin: 30px 0 0 20px;
}

button {
  margin-top: 60px;
  padding: 5px 30px ;
  border: 2px solid #fd2d01;
  border-radius: 10px;
  background: #ffd7d7;
  font-size: 1rem;
}
</style>