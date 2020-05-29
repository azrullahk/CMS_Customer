<template>
<div>
  <section class="jumbotron text-center" style="height: 60px;" v-if="!sucRes">
      <div class="container">
        <h1 class="jumbotron-heading">Please input your valid data</h1>
      </div>
  </section>
  <div class="container main">
      <h1 class="display-4">
        Apple.ID
      </h1> <br>
      <div class="col-4">
        <!-- err respon -->
        <div class="alert alert-danger"
        v-if="errRes"
        >
          {{ errRes }}
        </div>
        <!-- success respond -->
        <div v-if="sucRes" >
          <div class="alert alert-success">
            {{ sucRes }}
          </div>
          <button type="button" class="btn btn-info btn-lg" @click.prevent="cancelBtn">Back to login page</button>
        </div>
        <!-- form register -->
        <form @submit.prevent="register" class="text-left" v-if="!sucRes">
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input type="email" class="form-control" aria-describedby="emailHelp" v-model="email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" v-model="password">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input type="password" class="form-control" v-model="confirm_password">
          </div>
        <button type="submit" class="btn btn-primary btn-lg">Register</button> <span> </span>
        <button type="button" class="btn btn-danger btn-lg" @click.prevent="cancelBtn">Cancel</button>
        </form>
      </div>
  </div>
</div>
</template>

<script>
import server from '../api' 

export default {
  name: 'RegisterViews',
  data () {
    return {
      email: '',
      password: '',
      confirm_password: '',
      errRes: '',
      sucRes: ''
    }
  },
  methods: {
    register () {
      server({
        method: 'post',
        url: '/customer/register',
        data: {
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password
        }
      })
      .then(result =>{
        this.sucRes = 'Successfuly register'
      })
      .catch(err =>{
        this.errRes = err.response.data.msg
      })
    },
    cancelBtn () {
      this.$router.push('/login')
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
}
</style>