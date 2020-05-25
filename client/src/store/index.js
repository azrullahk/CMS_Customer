import Vue from 'vue'
import Vuex from 'vuex'
import Server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    product: []
  },
  mutations: {
    SET_PRODUCT (state, payload) {
      state.product = payload
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
    }
  },
  modules: {
  }
})
