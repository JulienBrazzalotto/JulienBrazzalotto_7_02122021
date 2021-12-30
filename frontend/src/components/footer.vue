<!-- COMPONENT - FOOTER -->

<template>
  <footer>
    <ul>
        <li>
            <router-link to="/Numeros">Numéros utiles</router-link>
        </li>
        <li>
            <p><img src="../assets/images/icon-above-font.png" alt="Logo Groupomania"></p>
        </li>
        <li>
            <a href="mailto:admin@groupomania.com"> Contacter l'administrateur</a>
        </li>
    </ul>
  </footer>
</template>

<!-- ------------------------------------- -->
<!-- --------------- STYLE --------------- -->
<!-- ------------------------------------- -->

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
  font-size: 1.5vw;
  color: #000000;
  text-decoration: none;
}

a:hover {
  color: #fd2d01;
}

img {
    height: 200px;
}

</style>

