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
        <form @submit.prevent="submitPayment">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">Nama Depan</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Nama Belakang</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
            </div>
          </div>

          <div class="mb-3">
            <label for="username">Username</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">@</span>
              </div>
              <input type="text" class="form-control" id="username" placeholder="Username" required>
            </div>
          </div>

          <div class="mb-3">
            <label for="email">Email <span class="text-muted">(Optional)</span></label>
            <input type="email" class="form-control" id="email" placeholder="you@example.com">
          </div>

          <div class="mb-3">
            <label for="address">Alamat</label>
            <input type="text" class="form-control" id="address" placeholder="1234 Jln gn" required>
          </div>

          <div class="mb-3">
            <label for="address2">Alamat 2 <span class="text-muted">(Optional)</span></label>
            <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
          </div>

          <div class="row">
            <div class="col-md-5 mb-3">
              <label for="country">Kota</label>
              <select class="custom-select d-block w-100" id="country" required>
                <option value="">Choose...</option>
                <option>Dki Jakarta</option>
              </select>
            </div>
            <div class="col-md-4 mb-3">
              <label for="state">Kabupaten</label>
              <select class="custom-select d-block w-100" id="state" required>
                <option value="">Choose...</option>
                <option>Jaksel</option>
              </select>
            </div>
            <div class="col-md-3 mb-3">
              <label for="zip">Kode Pos</label>
              <input type="text" class="form-control" id="zip" placeholder="" required>
            </div>
          </div>
          <hr class="mb-4">
          <div class="custom-control custom-checkbox text-left">
            <input type="checkbox" class="custom-control-input" id="same-address">
            <label class="custom-control-label" for="same-address">Alamat pengiriman sama dengan Alamat penagihan</label>
          </div>
          <div class="custom-control custom-checkbox text-left">
            <input type="checkbox" class="custom-control-input" id="save-info">
            <label class="custom-control-label" for="save-info">Simpan informasi ini untuk transaksi selanjutnya</label>
          </div>
          <hr class="mb-4">

          <h4 class="mb-3">Pembayaran Mengunakan</h4>

          <div class="d-block my-3">
            <div class="custom-control custom-radio text-left">
              <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
              <label class="custom-control-label" for="credit">Kartu Kredit</label>
            </div>
            <div class="custom-control custom-radio text-left">
              <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
              <label class="custom-control-label" for="debit">Kartu Debit</label>
            </div>
            <div class="custom-control custom-radio text-left">
              <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required>
              <label class="custom-control-label" for="paypal">PayPal</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="cc-name">Nama yang tertera di kartu</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" required>
              <small class="text-muted">Nama lengkap yang tertera di kartu</small>
            </div>
            <div class="col-md-6 mb-3">
              <label for="cc-number">Nomor kartu kredit</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" required>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="cc-expiration">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
            </div>
            <div class="col-md-3 mb-3">
              <label for="cc-cvv">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
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
export default {
  name: 'CheckoutViews',
  data () {
    return {
      cartList: [],
      shipingMethod: '',
      allCost: ''
    }
  },
  methods: {
    submitPayment () {
      this.$router.push('/invoice')
    },
    convert (price) {
      return convertToRp (price)
    }
  },
  created () {
    this.cartList = this.$store.state.cart
    this.allCost = this.$store.state.allCost
    console.log(this.allCost)
  }
}
</script>

<style scoped>
.container {
  max-width: 960px;
}

.lh-condensed { line-height: 1.25; }
</style>