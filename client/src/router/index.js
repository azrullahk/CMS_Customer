import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingViews from '../views/LandingViews'
import IphoneViews from '../views/IphoneViews'
import IpadViews from '../views/IpadViews'
import MacbookViews from '../views/MacbookViews'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingViews
  },
  {
    path: '/iphone',
    name: 'Iphone',
    component: IphoneViews
  },
  {
    path: '/ipad',
    name: 'Ipad',
    component: IpadViews
  },
  {
    path: '/macbook',
    name: 'Macbook',
    component: MacbookViews
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
