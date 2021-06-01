<template>
    <div class="row mx-auto my-5">
        <div class="col-lg-8 mx-auto bg-dark ">
            <div>
                <img class="rounded-circle" width="50" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">
            </div>
            <div class="text-white font-weight-bold">
                {{ username + " " + ""}}
            </div>
            <div class="card my-3 mx-auto">
                {{ title }} 
                {{ content }} 
                 {{ likes }}
                 {{attachment}}
			<div class="card my-3 mx-auto">
                
               
            </div>
            
            </div>
        <slot name="Comments"></slot>
        <slot name="EditCom"></slot>
            <div>
            <img id="imgpost"  width="150" height="150" :src="attachment">
                </div>
        </div>
        <div>
           <img :src="attachment" alt=""> 
        </div>
</div>
</template>

<script>
export default {
name: "Post",
data() {
    return { 
        post:null
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
        attachment: {
            type: String
        },
        commentContent: {
            type: String
        }
    },
    methods: {
    getImgUrl(attachment) {
    return require('@/images '+attachment)
    }
}
}
</script>

<style scoped>
#imgpost {
 max-width: 300px;
 max-height: 300px;
}
</style>
