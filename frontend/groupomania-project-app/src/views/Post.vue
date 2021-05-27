<template>
    <div class="row mx-auto my-5">
        <div class="col-lg-8 mx-auto bg-dark ">
            <div>
                <img class="rounded-circle" width="50" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">
            </div>
            <div class="text-white font-weight-bold">
                {{ username + " " + "a écrit"}}
            </div>
            <div class="card my-3 mx-auto">
                {{ title }} 
                {{ content }} 
                 {{ likes }}
			<div class="card my-3 mx-auto">
                
                <div>
            <img id="imgpost" :src="imageUrl">
                </div>
            </div>
            </div>
        <slot name="Comments"></slot>
        <slot name="EditCom"></slot>
         
  </div>      
</div>
</template>

<script>
export default {
name: "Post",
data() {
    return {
    }
},
    props: {
        
        username: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        },   
        likes: {
            type: String,
            default: ""
        },   
        postId: {
            type: String
        },
        imageUrl: {
            type: String
        },
        commentContent: {
            type: String
        }
    },
}
</script>

<style scoped>
#imgpost {
 max-width: 200px;
 max-height: 200px;
}
</style>
