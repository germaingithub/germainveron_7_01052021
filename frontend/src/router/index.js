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
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/users/me/",
    name: "UserProfil",
    component: () => import("../components/UserProfil.vue"),
  },
  {
    path: "/messages/new/",
    name: "CreateMessage",
    component: () => import("../components/CreateMessage.vue"),
  },
  {
    path: "/messages/",
    name: "ListMessages",
    component: () => import("../components/ListMessages.vue"),
    data: ()=> {
      
    }
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


