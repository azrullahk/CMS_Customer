<template>
  <div class="card" style="width: 18rem;">
    <img :src="product.imgUrl" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">Rp. {{ convert(product.price) }}</p>
      <a class="btn btn-primary addtocart" @click.prevent="addToCart(product.id)">Add to Cart</a>
    </div>
  </div>
</template>

<script>
import convertToRp from '../helpers/convertToRp.js'

export default {
  name: 'card',
  props: ['product'],
  methods: {
    convert (price) {
      return convertToRp (price)
    },
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
      this.$router.push('/cart')
    }
  }
}
</script>

<style scoped>
.card {
  margin-right:16px;
}
.addtocart {
  color: white;
}
</style>