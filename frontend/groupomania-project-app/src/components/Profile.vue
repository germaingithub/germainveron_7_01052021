<template>
    <div>
        <section class="section">
            <div class="container-fluid">
                <h1>Votre profil</h1>
                <div class="container-fluid bg-info col-6">
                    <div>
                    <img alt="Profil image" class="rounded-circle mt-2" width="100" height="100" src="https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60">
      </div>
                
                <div>
                <p> {{ username }}</p>
                </div>
                 <b-link class="btn btn-light btn-lg mb-5" to="Allpost">Tout les posts</b-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {required} from "vuelidate/lib/validators"; 
//import axios from "axios";
export default {
name: 'profile',
data() {
    return {
    token: localStorage.getItem('token'),   
    image: "",
    name: "",
    username: localStorage.getItem('username'),
    submited: false,
        }
    },
validations: {
   name: {
        required,
    },
    
},
methods:{
  handleFileUpload(){
   
      
    this.image = this.$refs.image.files[0];
}, 
} 
}
</script>
