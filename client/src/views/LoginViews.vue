<template>
<div>
  <section class="jumbotron text-center" style="height: 60px;">
      <div class="container">
        <h1 class="jumbotron-heading">Please Login First Before Continue</h1>
      </div>
  </section>
  <div class="container main">
      <h1 class="display-4">
        Apple.ID
      </h1> <br>
      <div class="col-4">
        <div class="alert alert-danger"
        v-if="errRes"
        >
          {{ errRes }}
        </div>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input type="email" class="form-control" aria-describedby="emailHelp" v-model="email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form> <br>
        <!-- register button -->
        <span class="text text-muted">
          Didn't have an account ?
        </span> <br> <hr>
        <button class="btn btn-info btn-lg">Register Here</button>
      </div>
  </div>
</div>
</template>

<script>
import server from '../api' 

export default {
  name: 'LoginViews',
  data () {
    return {
      email: '',
      password: '',
      errRes: ''
    }
  },
  methods: {
    login () {
      server({
        method: 'post',
        url: '/customer/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(result =>{
        localStorage.setItem('appleID_token', result.data.token)
        this.$store.dispatch('isLogin', true)
        this.$router.push('/cart')
      })
      .catch(err =>{
        this.errRes = err.response.data.msg
      })
    }
  },
  created () {
    let userLogin = localStorage.getItem('appleID_token')
    if (userLogin) {
      this.$router.push('/cart')
    }
  }
}
</script>

<style>

.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70vh;
}
</style>