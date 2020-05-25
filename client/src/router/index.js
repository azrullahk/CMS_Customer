import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingViews from '../views/LandingViews'
import IphoneViews from '../views/IphoneViews'
import IpadViews from '../views/IpadViews'
import MacbookViews from '../views/MacbookViews'
import CartViews from '../views/CartViews'
import CheckoutViews from '../views/CheckoutViews'
import InvoiceViews from '../views/InvoiceViews'

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
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartViews
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutViews
  },
  {
    path: '/invoice',
    name: 'Invoice',
    component: InvoiceViews
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
