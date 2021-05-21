<template>
    
<div class="container">

  <div class="content">
    <div class="cursor" id="cursor"></div>
    <div class="title" id="title"><span>Welcome to Instamania</span></div>
    <router-link id="button" class=" button nav-link border border-dark border-3 shadow-lg p-3 mb-5 rounded w-25 p-3 fs-1" to="/signup">Signup</router-link>
  </div>
</div>
</template>

<script>
export default {
    name: 'Home',
}
</script>


<style scoped>
body {
  margin:0;
  padding:0;
}

.container {
  width:100vw;
  max-width:100%;
  height:100vh;
  background: url('https://images.unsplash.com/photo-1501349800519-48093d60bde0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size:cover;
  background-position:center center;
}

.content {
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
}



.button {
  display:flex;
  justify-content:center;
  align-items:center;
  width:500px;
  height:70px;
}

.button span {
  padding:10px 20px;
  border:2px solid black;
  color:black;
  font-weight:900;
  border-radius:5px;
  pointer-events: none;
}

.title {
  display:flex;
  justify-content:center;
  align-items:center;
  width:500px;
  height:100px;
  margin-top:200px;
  margin-bottom:50px;
}

.title span {
  font-size:50px;
  color:black;
}


</style>