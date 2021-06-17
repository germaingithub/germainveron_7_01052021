<template>
    <div class="last-comments">
        
        <div class="comment-bloc">
            <div class="comment-area">
                
                <p aria-label="commentaire">{{ contentComment }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Comment',
    props: {
        //commentUsername: {
         //   type: String,
          //  default: ""
        //},
        contentComment: {
            type: String,
            default: ""
        }
    }
}
</script>
<style scoped>
</style>