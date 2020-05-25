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
                                <th class="text-left">Harga</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src="https://s0.bukalapak.com/img/55848143041/large/iphone_11_pro_max_512gb_new_PRE_ORDER.jpg" style="height: 50px; witdh:50px;"> </td>
                                <td>Iphone 11 Pro</td>
                                <td><input class="form-control" type="text" value="1" /></td>
                                <td class="text-left">Rp. 20,000,000</td>
                                <td><button class="btn btn-sm btn-danger"> Hapus </button> </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td class="text-right">Sub-Total</td>
                                <td class="text-left">Rp. 20,000,000</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td class="text-right" >Biaya Pengiriman</td>
                                <td class="text-left">Rp. 67,000</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td class="text-right"><strong>Total</strong></td>
                                <td class="text-left"><strong>Rp. 20,067,000</strong></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col mb-2">
            <div class="row">
                <div class="col-sm-12  col-md-6 button">
                    <button class="btn btn-lg btn-block btn-info">Lanjut Belanja</button>
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
export default {
  name: 'CartViews',
  methods: {
    checkoutBtn () {
      this.$router.push('/checkout')
    }
  }
}
</script>

<style scoped>
.button {
  margin-top: 15px;
}
</style>