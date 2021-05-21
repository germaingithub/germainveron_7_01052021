<template>
  <div id="app">
    <div id="nav">
      <navbar></navbar>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
//
//import HelloWorld from './components/HelloWorld.vue'
//import Navbar from './Navbar'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    //'navbar': Navbar

    Navbar,
    //Signup,
  }
}
</script>

<style lang="scss">
  body {
    font-family: "Raleway", Arial, Helvetica, sans-serif;
    justify-content: center;
    background-color: green;
}
</style>
