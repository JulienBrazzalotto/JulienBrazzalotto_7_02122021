<template>
  <footer>
    <ul>
        <li>
            <Numero />
        </li>
        <li>
            <img src="../assets/images/icon-above-font.png" alt="">
        </li>
        <li>
            <a href="mailto:admin@groupomania.vom"> Contacter l'administrateur</a>
        </li>
    </ul>
  </footer>
</template>


<script>
import Numero from "./Numero";


export default {
  name: "Footer",
  components: {
    Numero
  },
};
</script>






<style scoped>
ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
}

img {
    height: 200px;
}
</style>

