<template>
    <div>
        <h1> Tout les messages</h1>
    </div>
</template>

<script>
import  axios  from "axios"
export default {
    name: 'ListMessages',
    data(){
        return{
            message: null,
        }
    },
    mounted(){
    axios
    .get('http://localhost:8081/api/messages')
    .then((res) => {
        this.message = res.data;
        console.log(this.content);
    });
},
}

</script>


<style scoped>

</style>
