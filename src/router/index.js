import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Homepage.vue'
import store from "../store";

Vue.use(VueRouter)

// const ifNotAuthenticated = (to, from, next) => {
//   console.log("from", from, store.getters.isAuthenticated)
//   if (!store.getters.isAuthenticated) {
//     next();
//     return;
//   }
//   next(from);
// };
// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next();
//     return;
//   }
//   next();
// };
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,

  },

  {
    path: "/confirm",
    name: "confirm",
    component: () =>
      import("../components/confirmation.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () =>
      import("../components/downloadUser.vue"),

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
