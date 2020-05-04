<template>
  <div>
    <div class="p-3 px-md-4 mb-3 bg-primary border-bottom shadow-sm">
      <div class="row justify-content-between align-items-center">
        <div class="col-4 pt-1">
          <NLink class="text-white" to="/">
            <i class="fa fa-bars" aria-hidden="true" />
          </NLink>
        </div>
        <div class="col-4 text-center">
          <logo />
        </div>
        <div class="col-4 d-flex justify-content-end align-items-center">
          <i class="fa fa-user-circle fa-2x text-white" aria-hidden="true" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <svg
            class="bd-placeholder-img"
            width="100%"
            height="400"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="Placeholder: Thumbnail"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#F1F9FE" />
            <text x="50%" y="50%" fill="#2699FB" dy=".3em">IMG</text>
          </svg>
        </div>
        <div class="col-md-6">
          <form method="post" class="py-5" @submit.prevent="login">
            <h3 class="font-weight-light">
              Access to platform
            </h3>
            <h2 class="font-weight-bold">
              Login
            </h2>
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input
                id="exampleInputEmail1"
                v-model="email"
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
              >
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                id="exampleInputPassword1"
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Password"
                required
              >
            </div>
            <button type="submit" class="btn btn-primary text-uppercase">
              To Access
            </button>
            <div class="alert">
              {{ error }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$router.push('/companies')
      } catch (e) {
        swal('Error!', e.response.data.error, 'error')
        this.error = e.response.data.error
      }
    }
  },
  head () {
    return {
      title: 'Login User'
    }
  }
}
</script>

<style>

</style>
