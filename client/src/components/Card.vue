<template>
  <div class="card" style="width: 18rem;">
    <img :src="product.imgUrl" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">Rp. {{ convert(product.price) }}</p>
      <a href="#" class="btn btn-primary">Add to Cart</a>
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
    }
  }
}
</script>

<style>
.card {
  margin-right:16px;
}
</style>