<template>
    <header class="nav">
        <img src="../assets/images/logo-groupomania.png" alt="Logo Groupomania" />
        <nav>
            <router-link to="/admin/users" v-if="id === 1" ><i class="fas fa-user-lock link"></i></router-link>
            <router-link to="/profile"><i class="fas fa-user-circle link"></i></router-link>
            <a class="link" @click="disconnectUser()">Se deconnecter</a>
        </nav>
    </header>
</template>


<script>

export default {
name: 'HeaderProfile',
data () {
	return {
		id:''
	}
},
methods: {
	disconnectUser() {
		localStorage.clear();
		this.$router.push("/")
	},
	idUser() {
		this.id = JSON.parse(localStorage.getItem("userId"))
	}
},
mounted(){
    this.idUser()
}
}   
</script>




<style scoped>

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

img {
  height: 5vw;
}

.link {
  padding-left: 50px;
  font-size: 1.5vw;
  text-decoration: none;
  cursor: pointer;
}

.link:hover {
  color: #fd2d01;

}
.nav {
  padding: 50px;
  font-size: 1rem;
}

.nav a {
  font-weight: bold;
  color: #000000;
}

.nav a.router-link-exact-active {
  color: #fd2d01;
}

i {
    font-size: 3rem;
}
</style>