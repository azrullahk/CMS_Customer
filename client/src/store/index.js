import Vue from 'vue'
import Vuex from 'vuex'
import Server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    product: [],
    cart: [],
    shiping: [
      {id:1, name: 'JNE', cost:50000},
      {id:2, name: 'JNT', cost:60000},
      {id:3, name: 'GOJEK', cost:75000},
      {id:4, name: 'GRAB', cost:75000}
    ],
  },
  mutations: {
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_CART (state, payload) {
      state.cart.push(payload)
    },
    SET_PRODUCT_QUANTITY (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    getProduct (context) {
      Server({
        method: 'get',
        url: '/product',
      })
      .then(result=> {
        context.commit('SET_PRODUCT', result.data)
        console.log(result.data)
      })
      .catch(err =>{
        console.log(err)
      })
    },
    addToCart (context,id) {
      let arr;
      let exist = false
      if (this.state.cart.length === 0) {
        this.state.product.forEach(element => {
          element.quantity = 1
          if (element.id === id) {
            arr = element
          }
        })
        context.commit('SET_CART', arr)
      } else {
        this.state.cart.forEach(el => {
          if (el.id === id) {
            exist = true
            el.quantity++
          } else {
            this.state.product.forEach(element => {
              if (element.id === id) {
                element.quantity = 1
                arr = element
              }
            })
          }
        });
        if (exist) {
          context.commit('SET_PRODUCT_QUANTITY', this.state.cart)
        } else {
          context.commit('SET_CART', arr)
        }
      }
    },
  },
  modules: {
  }
})
