import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)

//router
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../src/components/Home.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../src/components/Signup.vue"),
  },
  {
    path: "/users/login/",
    name: "Login",
    component: () => import("../src/views/Login.vue"),
  },
  {
    path: "/users/me/",
    name: "Myprofile",
    component: () => import("../src/views/Myprofile.vue"),
  },
  {
    path: "/messages/new/",
    name: "CreateMessage",
    component: () => import("../src/views/CreateMessage"),
  },
  {
    path: "/messages/",
    name: "ListMessages",
    component: () => import("../src/views/GeneralPost"),
  },
  {
    path: "/messages/:messageId/vote/like",
    name: "Like",
    component: () => import("../src/components/Like.vue"),
  },
  {
    path: "/messages/:messageId/vote/dislike",
    name: "DisLike",
    component: () => import("../src/components/Dislike.vue"),
  },
];

const router = new VueRouter ({
  routes
})

//const vue =new Vue ({
 //router
//}).$mount('app');

export default router


