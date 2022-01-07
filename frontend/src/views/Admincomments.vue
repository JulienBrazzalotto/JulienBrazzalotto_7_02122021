<template>
    <div>
        <HeaderProfile />
        <AdminNav />
        <div>
            
        </div>
        <router-link to="/allposts" class="button">Retour aux posts</router-link>
        <Footer />
    </div>
</template>

<script>
import HeaderProfile from "../components/HeaderProfile";
import AdminNav from "../components/AdminNav";
import Footer from "../components/Footer";

export default {
    name: 'Adminusers',
    components: {
        HeaderProfile,
        AdminNav,
        Footer
    }
}
</script>

<style scoped>

</style>