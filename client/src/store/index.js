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
    selectedShiping: '',
    allCost: '',
    isLogin: false,
    current_user_payment: '',
    isConfirmOrder: false,
  },
  mutations: {
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_PRODUCT_QUANTITY (state, payload) {
      state.cart = payload
    },
    SUBSTRAC_CART (state, payload) {
      state.cart = payload
    },
    DELETE_FROM_CART (state, payload) {
      state.cart = payload
    },
    SELECT_SHIPING (state, payload) {
      state.selectedShiping = payload
    },
    SET_ALL_COST (state, payload) {
      state.allCost = payload
    },
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_USER_PAYMENT_ADDRESS (state, payload) {
      state.current_user_payment = payload
    },
    SET_CONFIRM_ORDER (state, payload) {
      state.isConfirmOrder = payload
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
      let arr = [];
      let exist = false
      if (this.state.cart.length === 0) {
        this.state.product.forEach(element => {
          if (element.id === id) {
            element.quantity = 1
            arr.push(element)
          }
        })
        context.commit('SET_CART', arr)
      } else {
        this.state.cart.forEach(el => {
          if (el.id === id) {
            exist = true
            el.quantity++
          }
        });
        if (exist) {
          context.commit('SET_CART', this.state.cart)
        } else {
            let newArr = this.state.cart
            this.state.product.forEach(element => {
              if (element.id === id) {
                element.quantity = 1
                newArr.push (element)
              }
            })
          context.commit('SET_CART', newArr)
        }
      }
    },
    substrac (context, id) {
      let plus = false
      this.state.cart.forEach(element => {
        if (element.id === id) {
          if (element.quantity < 2) {
            let newArr = []
            this.state.cart.forEach(element => {
              if (element.id !== id) {
                newArr.push(element)
              }
            });
            context.commit('DELETE_FROM_CART', newArr)
          } else {
            plus = true
            element.quantity--
          }
        }
      });
      if (plus) {
        context.commit('SUBSTRAC_CART', this.state.cart)
      }
    },
    deleteFromCart (context, id) {
      let newArr = []
      this.state.cart.forEach(element => {
        if (element.id !== id) {
          newArr.push(element)
        }
      });
      context.commit('DELETE_FROM_CART', newArr)
    },
    selectShiping (context, name) {
      this.state.shiping.forEach(element => {
        if (element.name === name) {
          context.commit('SELECT_SHIPING', element)
        }
      });
    },
    setAllCost (context, payload) {
      context.commit('SET_ALL_COST', payload)
    },
    isLogin(context, bool) {
      context.commit('SET_IS_LOGIN', bool)
    },
    getPaymentAddress (context) {
      Server ({
       method: 'get',
       url: '/customer/getPaymentAddress',
       headers: {
         token: localStorage.getItem('appleID_token')
       }
     })
     .then(payment =>{
       if (payment) {
         context.commit('SET_USER_PAYMENT_ADDRESS', payment.data.result)
       } else {
         console.log("no payment address")
       }
     })
     .catch(err =>{
       console.log(err)
     })
    },
    isConfirmOrder (context, bool) {
      if (!bool) {
        context.commit('SET_CART', [])
      }
      context.commit('SET_CONFIRM_ORDER', bool)
    }
  },
  modules: {
  }
})
