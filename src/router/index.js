import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import contentPreview from '../components/contentPreview'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/content-display',
    name: 'contentPreview',
    component: contentPreview,
    props: true,

  },

]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
