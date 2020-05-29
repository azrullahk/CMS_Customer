<template>
  <div>
    <section class="jumbotron text-center">
    <div class="container">
      <h1 class="jumbotron-heading">Your Orders</h1>
    </div>
    </section>
    <!-- main -->
    <div class="container" id="main">
      <!-- content -->
      <div class="container mb-4">
        <!-- empty orders -->
        <div v-if="orders.length <= 0">
          <div class="alert alert-danger">
            <p>You Don't Have Any Order</p> 
          </div>
          <button class="btn btn-primary btn-ld" type="button" @click.prevent="continuedShoping">
          Go Shoping
          </button>
        </div>

        <!-- order table -->
          <div class="row" v-else>
              <div class="col-12">
                  <div class="table-responsive">
                      <table class="table table-striped">
                          <thead>
                              <tr>
                                  <th>Order</th>
                                  <th>Product</th>
                                  <th>Harga</th>
                                  <th>Status</th>
                                  <!-- <th colspan="3">Action</th> -->
                              </tr>
                          </thead>
                          <tbody>
                              <!-- cart table -->
                            <tr
                              v-for="order in orders" :key="order.id"
                            >
                              <td> {{ order.id }} </td>
                              <td class="text-left">
                                <ul>
                                  <li
                                    v-for="item in order.items" :key="item.id"
                                  >
                                    {{ item }}
                                  </li>
                                </ul>
                              </td>
                              <td class="text-right"> 
                                <ul style="list-style-type:none;">
                                  <li
                                    v-for="price in order.price" :key="price.id"
                                  >
                                    Rp. {{ convert(price) }}
                                  </li>
                                </ul> 
                              </td>
                              <td> 
                                <p class="alert alert-success"> {{ order.status }} </p>  
                              </td>
                              <!-- <td> <button class="btn btn-sm btn-info" type="button" @click.prevent=""> Info </button> </td> -->
                            </tr>
                              <!-- subtotal table -->
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import convertToRp from '../helpers/convertToRp.js'

export default {
  name: 'OrderViews',
  data () {
    return {
      orders: ''
    }
  },
  methods: {
    proccessUserOrders () {
      let newOrder = []
      this.orders.forEach(element => {
        element.items = element.items.split(';')
        element.price = element.price.split(';')
        element.price.pop()
        element.items.pop()
        newOrder.push(element)
      });
      this.orders = newOrder
    },
    convert (price) {
      return convertToRp (price)
    },
    continuedShoping () {
      this.$router.push('/')
    }
  },
  created () {
    if (this.$store.state.isLogin) {
      this.$store.dispatch('getUserOrder')
      this.orders = this.$store.state.UserOrder.reverse()
      this.proccessUserOrders()
      console.log(this.orders)
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style>
#main {
  height: 75vh;
}
</style>