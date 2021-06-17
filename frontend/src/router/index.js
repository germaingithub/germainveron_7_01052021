import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)

//router
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Home.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../components/Signup.vue"),
  },
  {
    path: "/users/login/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/users/me/",
    name: "Myprofile",
    component: () => import("../views/Myprofile.vue"),
 },
  {
    path: "/messages/new/",
    name: "CreateMessage",
    component: () => import("../views/CreateMessage"),
  },
  {
    path: "/messages/",
    name: "ListMessages",
    component: () => import("../views/GeneralPost"),
  },
  {
    path: "/messages/:messageId/vote/like",
    name: "Like",
    component: () => import("../components/Like.vue"),
  },
  {
    path: "/messages/:messageId/vote/dislike",
    name: "DisLike",
    component: () => import("../components/Dislike.vue"),
  },
];

const router = new VueRouter ({
  routes
})

//const vue =new Vue ({
 //router
//}).$mount('app');

export default router


