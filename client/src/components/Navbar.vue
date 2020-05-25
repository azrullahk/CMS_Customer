<template>
<nav class="site-header sticky-top py-1">
  <div class="container d-flex flex-column flex-md-row justify-content-between">
    <router-link class="py-2" to='/' aria-label="Product">
      <span>Apple.ID</span>
    </router-link>
    <router-link class="py-2 d-none d-md-inline-block" to="/iphone">Iphone</router-link>
    <router-link class="py-2 d-none d-md-inline-block" to="/ipad">Ipad</router-link>
    <router-link class="py-2 d-none d-md-inline-block" to="/macbook">Macbook</router-link>
    <router-link class="py-2 d-none d-md-inline-block" to="/mac">Mac</router-link>
    <router-link class="py-2 d-none d-md-inline-block" to="/airpods">Airpods</router-link>
    <router-link class="py-2 d-none d-md-inline-block" to="/accessories">Accessories</router-link>
    <router-link class="py-2 d-none d-md-inline-block" to="/support">Support</router-link>
    <router-link class="py-2 d-none d-md-inline-block" to="/cart">Cart</router-link>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>

</style>