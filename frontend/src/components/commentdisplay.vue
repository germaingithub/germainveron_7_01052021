<template>
    <div id="link" href="" class="text-decoration-none text-reset card bg-light gap-12 col-6 p-3 mb-3 mr-6 d-flex flex-wrap align-self-center">
                        <div  v-for="comment in Comments" class="card" :key="comment.id">
                            <img id="image" class="container-fluid w-full" src="https://cdn.wallpapersafari.com/74/78/GFMUrn.jpg" width="450" height="350" alt="" />
                            <div class="text-decoration-none">
                                <h3 class="text-decoration-none" id="name"></h3>
                                <p class="text-decoration-none" id="description"></p>
                                <strong id="price"></strong><strong></strong>
                                <div class="card-text">
                                  
                                    <p class="ml-3"> {{ comment}}</p>
                                   
                                    <div class="ml-3">Ajouté le : {{ comment.createdAt}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
</template>

<script>
import  axios  from "axios"

export default {
    name: 'commentdisplay',
 
    
    data() {
        return {
            comment: "",
        }
    },
    
    getAllComments(id) {
    
axios
.get('http://localhost:8081/api/' + id + '/comment', { 
    headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token')
            }})
    .then((response) => {
        
        this.comment = response.comment;
        this.allCommentsDisplayed = true
     
    })
},
}


</script>


<style scoped>

</style>
