
<template>
  <footer>
    <ul>
        <li>
            <router-link to="/Numeros" aria-label="Numéros utiles">Numéros utiles</router-link>
        </li>
        <li>
            <p><img src="../assets/images/icon-above-font.png" alt="Logo Groupomania"></p>
        </li>
        <li>
            <a href="mailto:admin@groupomania.com" aria-label="Envoyer un mail à l'administrateur" > Contacter l'administrateur</a>
        </li>
    </ul>
    <div class="copyright">
      <p>© Groupomania | 2022 | Créateur du site Brazzalotto Julien </p>
    </div>
  </footer>
</template>

<style scoped>
ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    list-style: none;
    
}

li {
  width: 200px;
}

a {
  font-size: 1.2rem;
  color: #000000;
  text-decoration: none;
}

a:hover {
  color: #fd2d01;
}

img {
    height: 150px;
}

.copyright{
  font-size: 1rem;
}

@media screen and (max-width:768px) {
  a {
    font-size: 0.7rem;
  }

  ul {
    margin: 0
  }
  
  li {
    width: 150px;
  }

  img {
    height: 15vw;
  }

  .copyright{
  font-size: 0.8rem;
  }
}

</style>

