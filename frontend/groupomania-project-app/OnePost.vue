<template>
  <div>
    <Menu />

    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="6">
        <Post v-if="post" :post="post" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { apiClient } from '../groupomania-project-app/src/api/apiclient'
import router from './src/router/index'
import Post from '../groupomania-project-app/component/Post'
import Menu from '../groupomania-project-app/component/Menu'
export default {
  name: 'OnePost',
  components: {
    Post,
    Menu
  },
  data () {
    return {
      post: null
    }
  },
  watch: {
    $route (to, from) {
      this.loadPost()
    }
  },
  async mounted () {
    this.loadPost()
  },
  methods: {
    async loadPost () {
      const res = await apiClient.get(`api/messages/`)
      this.post = res.post
    }
  }
}
</script>

<style lang="scss"></style>