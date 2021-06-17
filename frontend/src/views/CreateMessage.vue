
<template>
  <div class="post">
   
  <NavbarPost />
  <SendPost/>
  <Footer/>
 
  </div>
</template>

<script>
import NavbarPost from '../components/NavPost'
import SendPost from '@/components/SendPost.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'AddPost', 
  components: {
  NavbarPost, SendPost, Footer    
}
}
</script>