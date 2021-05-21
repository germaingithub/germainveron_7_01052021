<template>
    <div id="link" href="" class="text-decoration-none text-reset card bg-light gap-12 col-6 p-3 mb-3 mr-6 d-flex flex-wrap align-self-center">
                        <div  v-for="messages in message" class="card" :key="messages.id">
                            <img id="image" class="container-fluid w-full" src="https://cdn.wallpapersafari.com/74/78/GFMUrn.jpg" width="450" height="350" alt="" />
                            <div class="text-decoration-none">
                                <h3 class="text-decoration-none" id="name"></h3>
                                <p class="text-decoration-none" id="description"></p>
                                <strong id="price"></strong><strong></strong>
                                <div class="card-text">
                                    <h3 class="ml-3"> {{ messages.title}}</h3>
                                    <p class="ml-3"> {{ messages.content}}</p>
                                    <span class="ml-3">Likes: {{ messages.likes}}</span>
                                    <div class="ml-3">Ajouté le : {{ messages.createdAt}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
</template>

<script>
import  axios  from "axios"

export default {
    name: 'ListMessages',
 
    
    data() {
        return {
            message: message,
        }
    },
    mounted(){
    axios
    .get('http://localhost:8081/api/messages')
    .then((res) => {
        this.message = res.data;
        console.log(this.message);
    });
},
}

</script>


<style scoped>

</style>
