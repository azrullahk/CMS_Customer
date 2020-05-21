import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingViews from '../views/LandingViews'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingViews
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
