<template>
    <div class="row mx-auto my-5">
        <div class="col-lg-8 mx-auto bg-dark ">
            <div>
                <img class="rounded-circle" width="50"
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">
            </div>
          
            <div class="card-text">
                <h2 class="ml-3 text-light text-uppercase"> {{ title }} </h2>
                <h4 class="ml-3 text-light"> {{ content }} </h4>
                
            </div>
            <div>
                <img id="imgpost" class="mb-3" :src="attachment">
                <h5 class="ml-3 text-light">Ecrit le {{ createdAt }} </h5>
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
                // post:null
            }
        },
        props: {

            username: {
                type: String,
               
            },
            title: {
                type: String,
                default: ""
            },
            content: {
                type: String,
                default: ""
            },
            //likes: {
            //    type: String,
            //    default: ""
            //},   
            Message_id: {
                type: String
            },
            attachment: {
                type: String
            },
            contentComment: {
                type: String
            },
            comment: {
                type: String
            },
            comments: {
                type: String
            },
             userId: {
                type: Number
            },
            createdAt: {
                type: Date
            }

        },

    }
</script>

<style scoped>
    #imgpost {
        max-width: 300px;
        max-height: 300px;
    }
</style>