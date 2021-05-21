<template>
  <div class="post">
   
  <NavbarPost />
  <Posts />
  <Footer />
  </div>
</template>

<script>
import NavbarPost from '../components/NavPost'
import Posts from './Post'
import Footer from '../components/Footer'
export default {
  name: 'AddPost', 
  components: {
  NavbarPost, Posts, Footer    
}
}
</script>