
  
<template>
<div>
		
<div class="col-lg-7 offset-lg-3 mx-auto">
    <div class="row mx-auto">
        <div class="col-lg-8 mx-auto">
			<div class="card my-3 bg-dark mx-auto">
                <div class="card-header">
					<h1 class="text-white"> Post </h1>
                </div>
            <div class="card-body py-2">
                <div class="d-flex">
                    <div class="col">
                        <form v-on:submit.prevent="createPost" enctype="multipart/form-data">

                         <div class="form-group mb-0">
                                <label class="sr-only" for="title">title</label>
                                <b-form-textarea name="title" type="text" v-model="title" class="form-control border-0" id="title" rows="2" placeholder="titre" required></b-form-textarea>
                            </div>
                            <div class="form-group mb-0">
                                <label class="sr-only" for="content">Créer un post</label>
                                <b-form-textarea name="content" type="text" v-model="content" class="form-control border-0" id="content" rows="2" placeholder="What's on you r mind today?" required></b-form-textarea>
                            </div>
                            <div class="form-group">
                            <label for="image">
        <input type="file" id="image" ref="image" v-on:change="handleFileUpload()"/>
      </label>
        
  <div class="col">
                        <button class="btn fluid btn-fposts btn-sm bg-danger text-dark font-weight-bold">Envoyer</button>
                    </div>
                    </div>
                     </form>
                    </div>
                </div>
            </div>
        </div>
		</div>
	</div>
</div>
</div>
</template>

<script>
import {required, maxLength,} from "vuelidate/lib/validators"; 
import axios from "axios";
export default {
name: "SendPost",
  data() {
    return {
    userId:parseInt(localStorage.getItem('userId')),    
    title: "",
    content: "",
    attachment:"",
    likes:0

    }
  },
 
validations: {
    content: {
        required,
        maxLength: maxLength(255)
    }
},
methods:{
  handleFileUpload(){
   
      
    this.image = this.$refs.image.files[0];
},  

createPost() {
    
   const formData = new FormData();
      if (this.imageUrl !== "") {
         formData.append("title", this.title); 
         formData.append("content", this.content); 
        formData.append("image", "");
        formData.append("likes", 0)
      formData.append("userId",parseInt(localStorage.getItem('userId')));
     
        
      } else {
          formData.append("title", this.title);
         formData.append("content", this.content);
        formData.append("likes", 0)
        formData.append("userId",parseInt(localStorage.getItem('userId')));
        
      }  console.log(formData.values);
     const config ={
         headers: {
        'Content-Type': "multipart/form-data",
        authorization: 'Bearer ' + localStorage.getItem('userToken')
        }
     };
axios.post('http://localhost:8081/api/messages/new',
formData,
 config
 )

.then((res) => {
   
    this.$router.push('/messages');
    console.log(res);
    alert("Bravo! Votre post est bien crée");
})
.catch(e => {
        console.log(e + "Impossible d'éditer le post, une erreur est survenue");
      
});
},
}
}
</script>

<style scoped>
</style>
