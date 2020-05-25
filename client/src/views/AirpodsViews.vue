<template>
<div class="container" id="main">
  <Card
  v-for="(product,i) in products" :key="i"
  :product="product"
  ></Card>
</div>
</template>

<script>
import Card from '../components/Card'

export default {
  name: 'IphoneViews',
  components: {
    Card
  },
  computed: {
    products () {
      let newArr = []
      this.$store.state.product.forEach(element => {
        if (element.category_id === 4) {
          newArr.push(element)
        }
      });
      return newArr
    }
  }
}
</script>

<style>
#main {
  display: flex;
  padding: 16px;
}

#right {
  background-color: black;
}
#left {
  background-color: blueviolet;
}

</style>