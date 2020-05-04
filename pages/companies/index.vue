<template>
  <div>
    <Menu />
    <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto">
      <div class="container">
        <div class="row">
          <div class="col">
            <h4 class="font-weight-bold text-primary">
              Welcome new User
            </h4>
            <h3 class="font-weight-bold text-wrap text-primary" style="width: 18rem;">
              Choose the company you belong to
            </h3>
          </div>
          <div class="col-md-3">
            <nuxt-link :to="`/companies/new`" class="btn btn-primary text-uppercase">
              Create new company
            </nuxt-link>
          </div>
        </div>
        <div class="row align-items-center mb-3 text-center mt-5">
          <div v-for="item of items" :key="item.id" class="col-md-3">
            <div class="card">
              <svg
                class="bd-placeholder-img card-img-top"
                width="100%"
                height="180"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                role="img"
                aria-label="Placeholder: Image cap"
              >
                <title>Placeholder</title><rect width="100%" height="100%" fill="#F1F9FE" />
                <text x="50%" y="50%" fill="#2699FB" dy=".3em">Image cap</text>
              </svg>
              <div class="card-body">
                <h4 class="card-title">
                  {{ item.name }}
                </h4>
                <h5>liders en pinturas</h5>
                <p class="card-text">
                  {{ item.ruc }}
                </p>
                <button class="btn btn-sm btn-primary" @click="itemTemp(item)">
                  Choose Company
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import Menu from '~/components/Menu.vue'

export default {
  components: {
    Menu
  },
  async asyncData (ctx) {
    return {
      items: await ctx.app.$companies.index()
    }
  },
  data () {
    return {
      auth: this.$auth.getToken('local'),
      items: []
    }
  },
  methods: {
    async itemTemp (item) {
      try {
        await this.$companies.create('/join', { companyId: item.id }).then(data => swal('Exito!', 'choose actualizado', 'success'))
        // this.$router.push('/products')
      } catch (e) {
        swal('Error!', e.response.data.error, 'error')
        this.error = e.response.data.error
      }
    }
  },
  head () {
    return {
      title: 'Companies'
    }
  }
}
</script>

<style>

</style>
