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
    :getAllComments="post.id"
    :userId="post.userId"
    > 
    
  <template getAllComments(post.id) v-slot:Comments v-if="post.comments !== null">
    <div class=" last-comments bg-dark " role="alert" aria-live="assertive" aria-atomic="true">
     
                <div class="toast-header comment-bloc"
                  v-for="comment in comments"
                  v-bind:key="comment.userId">
                  <div class="comment-area me-auto">
                  <p class="bg-light rounded-circle toast-body"> {{ comment.content }}</p>
                  <p> {{ comment.createdAt }}</p>
                </div>
              </div>
              
              
     </div> 
     
  </template>
  <template v-slot:EditCom>
    <div>
      <form>
       <div>
          <textarea id="contentComment" class="form-control" v-model="contentComment.content" aria-label="commentaire" placeholder="Commenter"
          ></textarea> 
       </div>
      <div>
        
        <button type="display" class="btn btn-outline-primary mr-1 mb-1" @click.prevent="getAllComments(post.id)" id="voircom" >Voir les commentaires</button>
        <button @click.prevent="sendCom(post.id)" class="btn btn-primary" id="sendcom" type="submit" aria-label="Publication d'un commentaire">Commenter</button>
         <div v-if="userId == post.userId || userId == 7 ">
        <button type="submit" class="btn btn-outline-danger mb-1" @click.prevent="deletePost(post.id)" id="delpost">Supprimer le post</button> 
         </div>
        </div> 
      </form>
    </div>
 </template>
 <CommentDisplay />
</Post>
  <Footer />
  </div>
</template>

<script>
import NavbarPost from '../components/NavPost'
import Post from './Post.vue'
import Footer from '../components/Footer'
import CommentDisplay from '../components/commentdisplay.vue'
import axios from "axios";
export default {
  name: 'allpost', 
  components: {
  NavbarPost, Post,CommentDisplay, Footer    
},
data() {

    return {
     
    posts: [],
    userId:localStorage.getItem('userId'),
    comments:"",
    isAdmin: 1,
    username:localStorage.getItem('username'),
    
    post: {
      userId:localStorage.getItem('userId'),
      title:"", 
      content: "",
      attachment:"image",
      //likes:"",
      comments: [],
      getAllComments:"post.id",
      id:"",
      isAdmin: localStorage.getItem('userId'),
    },
    id:"",
    user: {
      username:"",
      id:""
    },
    comment: {
        userId: "",
        Message_id:"",
        content: "",
        createdAt: ''
      },
contentComment: {
                content: '',
                createdAt: ''
            },
}
},
created() {
    
axios
.get('http://localhost:8081/api/messages/', {
    headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token')
            }})
    .then((response) => {
        
        this.posts = response.data;
        console.log(response.data);
      
        
    })
},

methods: {
  
    postImage() {
        
        return `/images/${this.post.attachment}`
        
    }, 
    sendCom(id) { 
        const comment = {
        content: this.contentComment.content,
        userId: parseInt(localStorage.getItem('userId')),
        Message_id: id
    };
    console.log(comment);
  axios.post('http://localhost:8081/api/' + id + '/comment', comment,
  {
  headers: {
  authorization: 'Bearer ' + localStorage.getItem('token')
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
  setComment(event){ console.log(event);
  this.contentComment = event.target.value
  },

//get comments

getAllComments(id) { 
    
axios
.get('http://localhost:8081/api/' + id + '/comment', {
    headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token')
            }})
    .then((comments) => { console.log(comments.data.content);
        
        this.comments = comments.data; 
        
      
     
    })
},

deletePost(id) {
    
    axios.delete('http://localhost:8081/api/messages/' + id, {
    headers: {
      
        'authorization': 'Bearer ' + localStorage.getItem('token')
            }})
    .then(response => {
      alert("Votre post a été supprimé !")
        console.log(response);
        this.$router.go()
    })
    .catch((error) => {
      
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