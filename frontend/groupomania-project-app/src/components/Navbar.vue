<template>
  <div><nav class="navbar navbar-expand-lg navbar-light " style="background-color: black;">
  <a class="navbar-brand ms-3 text-white" href="#">Welcome to Instamania</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link text-white" to="/" >Home</router-link></li>
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/signup">Inscription</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/users/login/">Login</router-link>
      </li>
    </ul>
<img id="image" class="position-relative end-1 me-3" src="../assets/logo_white.png" width="250" height="100" alt="" />
  </div>
</nav>

</div>
</template>

<script>
export default {
    name: 'navbar',
 
}
</script>

<style>

</style>