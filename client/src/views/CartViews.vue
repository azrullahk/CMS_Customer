<template>
  <div>
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Your Cart</h1>
      </div>
    </section>
    <!-- Main Content -->
    <div class="container mb-4">
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
                            </tr>
                            <!-- select shiping courier -->
                            <tr>
                                <td></td>
                                <td></td>
                                <td class="text-right" >Pilih Jasa Pengiriman</td>
                                <td class="text-left">
                                  <select class="form-control" id="exampleFormControlSelect1" v-model="seletedShiping">
                                    <option
                                    v-for="kurir in shiping" :key="kurir.id"
                                    > {{ kurir.name }} </option>
                                  </select>
                                </td>
                                <td></td>
                            </tr>
                            <!-- shiping cost table -->
                            <tr>
                                <td></td>
                                <td></td>
                                <td class="text-right" >Biaya Pengiriman</td>
                                <td class="text-left">Rp. {{ convertToRp(shipingCost) }}</td>
                                <td></td>
                            </tr>
                            <!-- total cost table -->
                            <tr>
                                <td></td>
                                <td></td>
                                <td class="text-right"><strong>Total</strong></td>
                                <td class="text-left"><strong>Rp. {{ convertToRp(total) }}</strong></td>
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
      totalCost: 0,
      seletedShiping: ''
    }
  },
  methods: {
    checkoutBtn () {
      this.$router.push('/checkout')
    },
    convertToRp (price) {
      return convertToRp(price)
    },
    selectShiping (name) {
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
      console.log (id, "add")
      this.$store.dispatch('addToCart', id)
    },
    substractQuantity (id) {
      console.log (id, "substract")
    },
    deleteProductFromCart (id) {
      console.log (id, "delete")
    }
  },
  computed: {
    cart () {
      this.$store.state.cart.forEach(element => {
        let sum = element.price*element.quantity
        this.subTotal+=sum
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
  }
}
</script>

<style scoped>
.button {
  margin-top: 15px;
}
</style>