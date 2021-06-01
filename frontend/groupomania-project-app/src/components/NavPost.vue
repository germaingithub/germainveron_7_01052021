<template>
    <div class="Navbar">
<b-navbar toggleable="lg" type="dark" variant="dark">
    
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
    <b-navbar-nav class="ml-auto">
        <b-nav-item size="sm" class="mr-sm-2 font-weight-bold"><router-link to="/messages" class="nav-link">Tous les posts</router-link></b-nav-item>
        <b-nav-item size="sm" class="mr-sm-2 font-weight-bold"><router-link to="/messages/new" class="nav-link">Ajouter un post</router-link></b-nav-item>
        <b-nav-item size="sm" class="mr-sm-2 mt-2 font-weight-bold" @click="logout" >Se déconnecter</b-nav-item>
    </b-navbar-nav>

    </b-collapse>
</b-navbar>
</div>
</template>

<script>
export default {
    name: 'NavbarPost',
    methods: {
    logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    this.$router.push('/')
    }
    
}
}

</script>

<style scoped>
.navbar-dark .navbar-nav .nav-link {
    color: rgba(255, 255, 255, 0.957);
}
</style>
