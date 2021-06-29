<template>
    
<div class="container">

  <div class="content">
    <div class="cursor" id="cursor"></div>
    <div class="title mb-0" id="title"><span>Welcome to Instamania</span></div>
    <h2 class=" mt-0 mb-0">by</h2>
    <img class="mt-0" width="250" height="250" src="../assets/logogm.png" alt="Logo GM">
    <router-link id="button" class=" button card-text nav-link text-dark border border-dark border-5 shadow-lg p-3 mb-5 bg-light rounded w-25 p-3 fs-1 fw-bold mb-5 mt-0 " to="/signup"><h2 class="tx-dark">Signup</h2></router-link>
 
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
  background: url('https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80');
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