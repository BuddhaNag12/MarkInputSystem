import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ut1 from '../views/unit_test_1.vue'
import ut2 from '../views/unit_test_2.vue'
import subs from '../views/subjects.vue'
import update from '../views/update_profile.vue'
import dashboard from '../views/dashboard.vue'
import unit_test_1 from '../views/show_mark_u1.vue'
import unit_test_2 from '../views/show_mark_u2.vue'
Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/ut1',
    name:'ut1',
    component:ut1
  },
  {
    path:'/ut2',
    name:'ut2',
    component:ut2
  },
  {
    path : '/subject-data/:dep',
    name: 'subject-data',
    component: subs,
    props: true
  },
  {
    path : '/update_profile/:uid',
    name: 'update',
    component: update,
    props:true
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  
  },
  {
    path : '/adminlogin',
    name: 'login',
    component: () => import( '../views/adminLogin.vue')
  },
  {
    path : '/register',
    name: 'register',
    component: () => import( '../views/registration.vue')
  },
  {
    path : '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path : '/ut1_marks',
    name: 'unit_test_1_marks',
    component: unit_test_1
  },
  {
    path : '/ut2_marks',
    name: 'unit_test_2_marks',
    component: unit_test_2
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
