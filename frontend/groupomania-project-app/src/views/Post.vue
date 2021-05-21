<template>
<div>
<div class="col-lg-7 offset-lg-3 mx-auto my-5">
    <h2>Tous les posts</h2>
    <div class="row mx-auto my-5" v-for="post in posts" :key="post.id">
        <div class="col-lg-8 mx-auto bg-dark ">
          	<div class="card my-3 mx-auto p-1">
                {{ post.title }} 
            </div>
			<div class="card my-3 mx-auto p-2">
                {{ post.content }} 
                
            </div>
            <div >
             <svg  style="width:17px;height:17px" viewBox="0 0 24 24">
          <path 
            fill="#ff0000"
            d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
          />
          
          
        </svg>
             <span class="ml-2 fs-2 text-light">{{ post.likes}}</span>  
            </div>
            
            <div class="form-group mr-0 ">
                <div class="my-2">
                        <button type="submit" @click.prevent="" class="btn btn-fposts btn-sm bg-danger text-dark font-weight-bold mr-0 ">Modifier</button>
                        </div>
                        <div>
                        <button type="submit" @click.prevent="" class="btn btn-fposts btn-sm bg-danger text-dark font-weight-bold">Supprimer</button>                   
                    </div>
                    </div>
                    </div>
	</div>
</div>
</div>
</template>

<script>
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)
export default {
name: "posts",
data() {
    return {
    token: localStorage.getItem("token"),
    posts: [],
    pseudo: localStorage.getItem("pseudo"),
};
},
mounted() {
axios
.get('http://localhost:8081/api/messages/', {
       headers: {
                'authorization': 'bearer ' + localStorage.getItem('token')
            }})
    .then((response) => {
        this.posts = response.data;
        console.log(response);
    })
}
}
</script>