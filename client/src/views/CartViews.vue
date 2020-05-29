<template>
  <div>
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Your Cart</h1>
      </div>
    </section>
    <!-- Main Content -->
    <div class="container mb-4" v-if="cart.length !== 0" id="cart">
      <div class="alert alert-danger" v-if="errRes">
        {{ errRes }}
      </div>
        <div class="row">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Produk</th>
                                <th>Nama Barang</th>
                                <th>Jumlah</th>
                                <th class="text-left">Total Harga</th>
                                <th colspan="3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- cart table -->
                            <tr 
                            v-for="product in cart" :key="product.id"
                            >
                                <td><img :src="product.imgUrl" style="height: 50px; witdh:50px;"> </td>
                                <td> {{ product.name }} </td>
                                <td> {{ product.quantity }} </td>
                                <td class="text-left">Rp. {{ convertToRp(product.price*product.quantity) }} </td>
                                <td> <button class="btn btn-sm btn-info" type="button" @click.prevent="substractQuantity(product.id)"> - </button> </td>
                                <td> <button class="btn btn-sm btn-info" type="button" @click.prevent="addQuantity(product.id)"> + </button> </td>
                                <td> <button class="btn btn-sm btn-danger" type="button" @click.prevent="deleteProductFromCart(product.id)"> Hapus </button> </td>
                            </tr>
                            <!-- subtotal table -->
                            <tr>
                                <td></td>
                                <td></td>
                                <td class="text-right">Sub-Total</td>
                                <td class="text-left">Rp. {{ convertToRp(subTotal) }} </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <!-- select shiping courier -->
                            <tr>
                                <td></td>
                                <td></td>
                                <td class="text-right" >Pilih Jasa Pengiriman</td>
                                <td class="text-left">
                                  <select class="form-control" id="exampleFormControlSelect1" v-model="seletedShiping" required>
                                    <option
                                    v-for="kurir in shiping" :key="kurir.id"
                                    > {{ kurir.name }} </option>
                                  </select>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <!-- shiping cost table -->
                            <tr>
                                <td></td>
                                <td></td>
                                <td class="text-right" >Biaya Pengiriman</td>
                                <td class="text-left">Rp. {{ convertToRp(shipingCost) }}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <!-- total cost table -->
                            <tr>
                                <td></td>
                                <td></td>
                                <td class="text-right"><strong>Total</strong></td>
                                <td class="text-left"><strong>Rp. {{ convertToRp(total) }}</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- button section -->
        <div class="col mb-2">
            <div class="row">
                <div class="col-sm-12  col-md-6 button">
                    <button class="btn btn-lg btn-block btn-info" @click.prevent="continuedShoping">Lanjut Belanja</button>
                </div>
                <div class="col-sm-12 col-md-6 button">
                    <button class="btn btn-lg btn-block btn-success" @click.prevent="checkoutBtn">Bayar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Empty Cart -->
    <div class="container mb-4" v-else id="emptyCart">
      <div class="alert alert-warning">
        <p>You don't have product in your cart</p>
      </div>
      <button class="btn btn-primary btn-ld" type="button" @click.prevent="continuedShoping">
        Go Shoping
      </button>
    </div>
  </div>
</template>

<script>
import convertToRp from '../helpers/convertToRp.js'

export default {
  name: 'CartViews',
  data () {
    return {
      subTotal: 0,
      shipingCost: 0,
      seletedShiping: '',
      errRes: ''
    }
  },
  methods: {
    checkoutBtn () {
      if (!this.seletedShiping) {
        this.errRes = 'Silahkan pilih jasa pengiriman'
        console.log(this.seletedShiping, "errRes")
      } else {
        let obj = {
          subTotal: this.subTotal,
          shipingCost: this.shipingCost,
          totalCost: this.total,
          seletedShiping: this.seletedShiping
        }
        this.errRes = ''
        this.$store.dispatch('setAllCost', obj)
        this.$router.push('/checkout')
      }
    },
    convertToRp (price) {
      return convertToRp(price)
    },
    selectShiping (name) {
      this.$store.dispatch('selectShiping', name)
      this.$store.state.shiping.forEach(element => {
        if (element.name === name) {
          this.shipingCost = element.cost
        }
      });
    },
    continuedShoping () {
      this.$router.push('/')
    },
    addQuantity (id) {
      // console.log (id, "add")
      this.$store.dispatch('addToCart', id)
      this.$router.push('/reload')
    },
    substractQuantity (id) {
      this.$store.dispatch('substrac', id)
      this.$router.push('/reload')
    },
    deleteProductFromCart (id) {
      this.$store.dispatch('deleteFromCart', id)
      this.$router.push('/reload')
    }
  },
  computed: {
    cart () {
      this.$store.state.cart.forEach(element => {
        let sum = element.price * element.quantity
        this.subTotal = this.subTotal + sum
      });
      return this.$store.state.cart
    },
    shiping () {
      return this.$store.state.shiping
    },
    total () {
      return this.subTotal+this.shipingCost
    }
  },
  watch: {
    seletedShiping () {
      this.selectShiping (this.seletedShiping)
    }
  },
  created () {
    let token = localStorage.getItem('appleID_token')
    if (!token) {
      this.$router.push('/login')
    } else {
      if ( this.$store.state.allCost ) {
        this.shipingCost = this.$store.state.allCost.shipingCost
        this.seletedShiping = this.$store.state.allCost.seletedShiping
      }
    }

  }
}
</script>

<style scoped>
.button {
  margin-top: 15px;
}

#cart {
  min-height: 75vh;
}

#emptyCart {
  height: 70vh;
}
</style>