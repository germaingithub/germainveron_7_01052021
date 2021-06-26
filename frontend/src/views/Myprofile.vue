
  
<template>
  <div class="post">
   
  <NavbarPost />
  <Profile />

  </div>
</template>

<script>
import NavbarPost from '../components/NavPost.vue'
import Profile from '../components/Profile.vue'

export default {
  name: 'AddPost', 
  components: {
  NavbarPost, Profile    
}
}
</script>
