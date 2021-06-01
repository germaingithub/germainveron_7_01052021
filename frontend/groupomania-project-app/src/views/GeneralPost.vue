<template>
<div class="post">
<NavbarPost />

<Post
    v-for="post in posts"
    :username ="post.username"
    :title="post.title"
    :content ="post.content"
    :likes ="post.likes"
    :attachment ="post.attachment"
    :key="post.id" 
    > 
  <template v-slot:Comments v-if="post.Comments !== null">
    <div class="last-comments">
                <div class="comment-bloc"
                  v-for="comment in post.comments"
                  v-bind:key="comment.id">
                  <div class="comment-area">
                  <p class="user-name">{{ comment.User.username }}</p>
                  <p>{{ comment.content }}</p>
                </div>
              </div>
     </div> 
  </template>
  <template v-slot:EditCom>
    <div>
      <form>
       
      <div>
        
        <button @click.prevent="sendCom(post.id)" id="sendcom" type="submit" aria-label="Publication d'un commentaire">Commenter</button>
        <button type="submit" @click.prevent="deletePost(post.id)" id="delpost" v-if="userId == post.userId || isAdmin == 1">Supprimer le post</button>
        </div>
      </form>
    </div>
 </template>
</Post>
  <Footer />
  </div>
</template>

<script>
import NavbarPost from '../components/NavPost'

import Post from './Post.vue'
import Footer from '../components/Footer'
import axios from "axios";
export default {
  name: 'allpost', 
  components: {
  NavbarPost, Post, Footer    
},
data() {
    
    return {
    posts: "",
    userId:localStorage.getItem("userId"),
    isAdmin: 1,
    post: {
      userId:localStorage.getItem('userId'),
      title:"", 
      content: "",
      attachment:"",
      likes:"",
    },
    id:"",
    user: {
      username:"",
      id:""
    },
    comments: {
        content: "",
        userId: "",
        id:""
      },
contentComment: {
                content: ''
            },
}
},
created() {
    
axios
.get('http://localhost:8081/api/messages/', {
    headers: {
        'authorization': 'Bearer ' + localStorage.getItem('userToken')
            }})
    .then((response) => {
        
        this.posts = response.data;
        console.log(response);
    })
},
methods: {
    postImage() {
        
        return `backend/images/${this.post.attachment}`
        
    }, 
    sendCom(id) {
        const comment = {
        content: this.comment.content,
        userId: parseInt(localStorage.getItem('userId')),
        postId: id
    };
    console.log(id);
axios.post('http://localhost:3000/api/auth/' + id + '/comment', comment,
{
headers: {
authorization: 'Bearer ' + localStorage.getItem('userToken')
}
})
.then((res) => {
    console.log(res);
   
    alert("Commentaire posté");
})
.catch(e => {
        console.log(e + "Impossible d'éditer le post, une erreur est survenue");
})
},
setComment(event){
this.commentContent = event.target.value
},
deletePost(id) {console.log(id);
    
    axios.delete('http://localhost:8081/api/messages/' + id, {
    headers: {
      
        'authorization': 'Bearer ' + localStorage.getItem('userToken')
            }})
    .then(response => {
      alert("Votre post a été supprimé !")
        console.log(response);
        this.$router.go()
    })
    .catch(error => {
      window.alert(error);
 })
}
}
}
</script>

<style scoped>
#imgpost {
 max-width: 200px;
 max-height: 200px;
}
</style>