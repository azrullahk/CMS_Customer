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
    <div class="dropdown">
    <button v-if="isLogin" class="btn btn-secondary dropdown-toggle py-2 d-none d-md-inline-block" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      User
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item text-inverse" @click.prevent="linkAccount">Account</a>
      <a class="dropdown-item text-inverse" @click="logout">Logout</a>
    </div>
  </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    linkAccount () {
      this.$router.push('/account')
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.go(0)
    }
  },
  created () {
    let token = localStorage.getItem('appleID_token')
    if (token) {
      this.$store.dispatch ('isLogin', true)
    }
  }
}
</script>

<style>

</style>