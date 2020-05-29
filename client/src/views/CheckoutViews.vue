<template>
<div>
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Form pembayaran</h1>
      </div>
    </section>
  <div class="container">
    <div class="row">
      <!-- cart list -->
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your cart</span>
          <span class="badge badge-primary badge-pill"> {{ cartList.length }} </span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-condensed"
          v-for="item in cartList" :key="item.id"
          >
            <div>
              <h6 class="my-0">{{ item.name }}</h6>
              <small class="text-muted">Jumlah : {{ item.quantity }} </small>
            </div>
            <span class="text-muted">Rp. {{ convert(item.price*item.quantity) }} </span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Ongkos Kirim</h6>
              <small class="text-muted"> {{ allCost.seletedShiping }} </small>
            </div>
            <span class="text-muted">Rp. {{ convert(allCost.shipingCost) }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Kode Promo</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span class="text-success">0</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>Rp. {{ convert(allCost.totalCost) }}</strong>
          </li>
        </ul>

        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Promo code">
            <div class="input-group-append">
              <button type="submit" class="btn btn-warning">Redeem</button>
            </div>
          </div>
        </form>
      </div>
      <!-- shiping form -->
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Alamat Penagihan</h4>
        <div class="col-12" style="text-align: right;">
          <router-link class="btn btn-warning" to="/reload">Auto Fill</router-link>
        </div> <br>
        <form @submit.prevent="submitPayment">
          <!-- name field -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">Nama Depan</label>
              <input v-model="shipingPaymentForm.first_name" type="text" class="form-control" id="firstName" placeholder="" value="" required>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Nama Belakang</label>
              <input v-model="shipingPaymentForm.last_name" type="text" class="form-control" id="lastName" placeholder="" value="" required>
            </div>
          </div>
          <!-- username -->
          <div class="mb-3">
            <label for="username">Username</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">@</span>
              </div>
              <input v-model="shipingPaymentForm.username" type="text" class="form-control" id="username" placeholder="Username" required>
            </div>
          </div>
          <!-- email -->
          <div class="mb-3">
            <label for="email">Email <span class="text-muted">(Optional)</span></label>
            <input v-model="shipingPaymentForm.email" type="email" class="form-control" id="email" placeholder="you@example.com">
          </div>
          <!-- address1 -->
          <div class="mb-3">
            <label for="address">Alamat</label>
            <input v-model="shipingPaymentForm.address1" type="text" class="form-control" id="address" placeholder="1234 Jln gn" required>
          </div>
          <!-- address2 -->
          <div class="mb-3">
            <label for="address2">Alamat 2 <span class="text-muted">(Optional)</span></label>
            <input v-model="shipingPaymentForm.address2" type="text" class="form-control" id="address2" placeholder="Apartment or suite">
          </div>
          <!-- City, province, ZIP code -->
          <div class="row">
            <div class="col-md-5 mb-3">
              <label for="country">Kota</label>
              <select v-model="shipingPaymentForm.city" class="custom-select d-block w-100" id="country" required>
                <option value="">Choose...</option>
                <option>Dki Jakarta</option>
              </select>
            </div>
            <div class="col-md-4 mb-3">
              <label for="state">Kabupaten</label>
              <select v-model="shipingPaymentForm.province" class="custom-select d-block w-100" id="state" required>
                <option value="">Choose...</option>
                <option>Jaksel</option>
              </select>
            </div>
            <div class="col-md-3 mb-3">
              <label for="zip">Kode Pos</label>
              <input v-model="shipingPaymentForm.ZIP" type="number" class="form-control" id="zip" placeholder="" required>
            </div>
          </div>
          <hr class="mb-4">
          <!-- select payment -->
          <h4 class="mb-3">Pembayaran Mengunakan</h4>
          <div class="d-block my-3">
            <select v-model="shipingPaymentForm.payment_method" class="custom-select d-block w-100" id="state" required>
              <option value="">Choose...</option>
              <option>Kartu Kredit</option>
              <option>Kartu Debit</option>
              <option>Paypal</option>
            </select>
          </div>
          <!-- name on card -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="cc-name">Nama yang tertera di kartu</label>
              <input v-model="shipingPaymentForm.name_on_card" type="text" class="form-control" id="cc-name" placeholder="" required>
              <small class="text-muted">Nama lengkap yang tertera di kartu</small>
            </div>
            <div class="col-md-6 mb-3">
              <label for="cc-number">Nomor kartu kredit</label>
              <input v-model="shipingPaymentForm.card_number" type="text" class="form-control" id="cc-number" placeholder="" required>
            </div>
          </div>
          <!-- card expiration, card CVV -->
          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="cc-expiration">Expiration</label>
              <input v-model="shipingPaymentForm.card_expiration" type="text" class="form-control" id="cc-expiration" placeholder="" required>
            </div>
            <div class="col-md-3 mb-3">
              <label for="cc-cvv">CVV</label>
              <input v-model="shipingPaymentForm.card_CVV" type="text" class="form-control" id="cc-cvv" placeholder="" required>
            </div>
          </div>
          <hr class="mb-4">
          <button class="btn btn-primary btn-lg btn-block" type="submit">Konfirmasi Pembayaran</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import convertToRp from '../helpers/convertToRp.js'
import server from '../api'
export default {
  name: 'CheckoutViews',
  data () {
    return {
      cartList: [],
      shipingMethod: '',
      allCost: '',
      shipingPaymentForm: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        province: '',
        ZIP: '',
        payment_method: '',
        name_on_card: '',
        card_number: '',
        card_expiration: '',
        card_CVV: ''
      }
    }
  },
  methods: {
    submitPayment () {
      // console.log(this.shipingPaymentForm)
      let { user_id, first_name, last_name, username, email, address1, address2, city, 
            province, ZIP, payment_method, name_on_card, card_number, card_expiration, card_CVV } = this.shipingPaymentForm      
      server({
        method: 'post',
        url: '/customer/addPaymentAddress',
        data: {
          user_id, first_name, last_name, username, email, address1, address2, city, 
          province, ZIP, payment_method, name_on_card, card_number, card_expiration, card_CVV
        },
        headers: {
          token: localStorage.getItem('appleID_token')
        }
      })
      .then(result =>{
        let items = ''
        let quantity = ''
        let price = ''
        this.cartList.forEach(element => {
          items+=element.name+';'
          quantity+=element.quantity+';'
          price+=element.price+';'
        });
        server({
          method: 'post',
          url: '/customer/confirmPayment',
          data: {
            items,
            quantity,
            price
          },
          headers: {
            token: localStorage.getItem('appleID_token')
          }
        })
        .then(result =>{
          this.$store.dispatch('isConfirmOrder', true)
          this.$store.dispatch('getUserOrder')
          this.$router.push('/invoice')
          console.log(result)
        })
        .catch(err =>{
          console.log(err)
        })
      })
      .catch(err =>{
        console.log(err)
      })
    },
    convert (price) {
      return convertToRp (price)
    }
  },
  created () {
    let token = localStorage.getItem('appleID_token')
    if (!token) {
      this.$router.push('/login') 
    } else if (this.$store.state.isConfirmOrder) {
      this.$router.push('/')
    } else {
      this.cartList = this.$store.state.cart
      this.allCost = this.$store.state.allCost
      this.$store.dispatch('getPaymentAddress')
      let current_user_payment = this.$store.state.current_user_payment
      if (current_user_payment) {
        this.shipingPaymentForm = current_user_payment
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 960px;
}

.lh-condensed { line-height: 1.25; }
</style>