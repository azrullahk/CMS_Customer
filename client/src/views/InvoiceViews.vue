<template>
<div>
  <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Invoice</h1>
      </div>
  </section>
  <div class="container">
    <div class="col-md-12">
        <div class="invoice">
          <!-- begin invoice-company -->
          <div class="invoice-company f-w-600 row">
            <div class="col-2 text-left">
              <h1>
                Apple.ID
              </h1>
            </div>
            <div class="col-10 text-right">
              <button class="btn btn-primary btn-lg" type="button" onclick="window.print()">Export to PDF</button> <span> </span>
              <button class="btn btn-warning btn-lg" type="button" @click.prevent="toOrders">View Order</button>
            </div>
          </div>
          <!-- end invoice-company -->
          <!-- begin invoice-header -->
          <div class="invoice-header">
              <div class="invoice-from">
                <small>Dari</small>
                <address class="m-t-5 m-b-5">
                    <strong class="text-inverse">Apple.ID</strong><br>
                    Jl.Jakarta, No.78, Pusat Perkantoran<br>
                    Dki Jakarta, 12345<br>
                    Phone: (123) 456-7890<br>
                    Fax: (123) 456-7890
                </address>
              </div>
              <div class="invoice-to">
                <small>Untuk</small>
                <address class="m-t-5 m-b-5">
                    <strong class="text-inverse">User</strong><br>
                    Street Address<br>
                    City, Zip Code<br>
                    Phone: (123) 456-7890<br>
                    Fax: (123) 456-7890
                </address>
              </div>
              <div class="invoice-date">
                <small>Invoice / date</small>
                <div class="date text-inverse m-t-5">
                  {{ date }}
                </div>
                <div class="invoice-detail">
                  <h4>Invoice Number</h4>
                    <h5>
                      #{{invoiceNumber}}<br>
                    </h5>
                </div>
              </div>
          </div>
          <!-- end invoice-header -->
          <!-- begin invoice-content -->
          <div class="invoice-content">
              <!-- begin table-responsive -->
              <div class="table-responsive">
                <table class="table table-invoice">
                    <thead>
                      <tr>
                          <th>PRODUCT</th>
                          <th class="text-center" width="10%">PRICE</th>
                          <th class="text-center" width="10%">QUANTITY</th>
                          <th class="text-right" width="20%">TOTAL COST</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in cartList" :key="item.id"
                      >
                          <td>
                            <span class="text-inverse">{{ item.name }}</span><br>
                          </td>
                          <td class="text-center">Rp. {{ convert(item.price) }}</td>
                          <td class="text-center">{{ item.quantity }}</td>
                          <td class="text-right">{{ convert(item.price*item.quantity) }}</td>
                      </tr>
                    </tbody>
                </table>
              </div>
              <!-- end table-responsive -->
              <!-- begin invoice-price -->
              <div class="invoice-price">
                <div class="invoice-price-left">
                    <div class="invoice-price-row">
                      <div class="sub-price">
                          <small>SUBTOTAL</small>
                          <span class="text-inverse">Rp. {{ convert(allCost.subTotal) }}</span>
                      </div>
                      <div class="sub-price">
                          <i class="fa fa-plus text-muted"></i>
                      </div>
                      <div class="sub-price">
                          <small>ONGKIR</small>
                          <span class="text-inverse">Rp. {{ convert(allCost.shipingCost) }}</span>
                      </div>
                    </div>
                </div>
                <div class="invoice-price-right">
                    <small>TOTAL</small> <span class="f-w-600">Rp. {{ convert(allCost.totalCost) }} </span>
                </div>
              </div>
              <!-- end invoice-price -->
          </div>
          <!-- end invoice-content -->
          <!-- begin invoice-note -->
          <div class="invoice-note">
              * Make all cheques payable to [Your Company Name]<br>
              * Payment is due within 30 days<br>
              * If you have any questions concerning this invoice, contact  [Name, Phone Number, Email]
          </div>
          <!-- end invoice-note -->
          <!-- begin invoice-footer -->
          <div class="invoice-footer">
              <p class="text-center m-b-5 f-w-600">
                THANK YOU FOR YOUR BUSINESS
              </p>
              <p class="text-center">
                <span class="m-r-10"><i class="fa fa-fw fa-lg fa-globe"></i> matiasgallipoli.com</span>
                <span class="m-r-10"><i class="fa fa-fw fa-lg fa-phone-volume"></i> T:016-18192302</span>
                <span class="m-r-10"><i class="fa fa-fw fa-lg fa-envelope"></i> rtiemps@gmail.com</span>
              </p>
          </div>
          <!-- end invoice-footer -->
        </div>
    </div>
  </div>
</div>
</template>

<script>
import convertToRp from '../helpers/convertToRp.js'

export default {
  name: 'InvoiceViews',
  data () {
    return {
      date: new Date(),
      invoiceNumber: '0000123DSS',
      cartList: '',
      allCost: ''
    }
  },
  methods: {
    convert (price) {
      return convertToRp (price)
    },
    toOrders () {
      this.$store.dispatch('isConfirmOrder', false)
      this.$store.dispatch('getUserOrder')
      this.$router.push('orders')
    }
  },
  created () {
    this.cartList = this.$store.state.cart
    this.allCost = this.$store.state.allCost
    if (!this.$store.state.isConfirmOrder) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
body{
    margin-top:20px;
    background:#eee;
}

.invoice {
    background: #fff;
    padding: 20px
}

.invoice-company {
    font-size: 20px
}

.invoice-header {
    margin: 0 -20px;
    background: #f0f3f4;
    padding: 20px
}

.invoice-date,
.invoice-from,
.invoice-to {
    display: table-cell;
    width: 1%
}

.invoice-from,
.invoice-to {
    padding-right: 20px
}

.invoice-date .date,
.invoice-from strong,
.invoice-to strong {
    font-size: 16px;
    font-weight: 600
}

.invoice-date {
    text-align: right;
    padding-left: 20px
}

.invoice-price {
    background: #f0f3f4;
    display: table;
    width: 100%
}

.invoice-price .invoice-price-left,
.invoice-price .invoice-price-right {
    display: table-cell;
    padding: 20px;
    font-size: 20px;
    font-weight: 600;
    width: 75%;
    position: relative;
    vertical-align: middle
}

.invoice-price .invoice-price-left .sub-price {
    display: table-cell;
    vertical-align: middle;
    padding: 0 20px
}

.invoice-price small {
    font-size: 12px;
    font-weight: 400;
    display: block
}

.invoice-price .invoice-price-row {
    display: table;
    float: left
}

.invoice-price .invoice-price-right {
    width: 25%;
    background: #2d353c;
    color: #fff;
    font-size: 28px;
    text-align: right;
    vertical-align: bottom;
    font-weight: 300
}

.invoice-price .invoice-price-right small {
    display: block;
    opacity: .6;
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 12px
}

.invoice-footer {
    border-top: 1px solid #ddd;
    padding-top: 10px;
    font-size: 10px
}

.invoice-note {
    color: #999;
    margin-top: 80px;
    font-size: 85%
}

.invoice>div:not(.invoice-footer) {
    margin-bottom: 20px
}

.btn.btn-white, .btn.btn-white.disabled, .btn.btn-white.disabled:focus, .btn.btn-white.disabled:hover, .btn.btn-white[disabled], .btn.btn-white[disabled]:focus, .btn.btn-white[disabled]:hover {
    color: #2d353c;
    background: #fff;
    border-color: #d9dfe3;
}
</style>