<template>
  <div>
    <div class="bg-light">
      <Menu />
      <div class="container py-2">
        <div class="row">
          <div class="col-md-8">
            <div v-if="company" class="card">
              <div class="card-body">
                <div class="card-title text-right">
                  <button class="btn btn-sm btn-outline-primary" @click="editTo(company)">
                    Edit company
                  </button>
                </div>
                <h5>{{ company.name }}</h5>
                <p>{{ company.ruc }}</p>
                <p>Still it was a square of faint light. The Sprawl was a square of faint light.</p>
              </div>
            </div>
          </div>
          <div class="col-4">
            <NLink to="/products/new" class="btn btn-primary text-uppercase">
              Create new product
            </NLink>
          </div>
        </div>
      </div>
    </div>
    <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto">
      <div class="container">
        <h4 class="font-weight-bold text-primary">
          All products
        </h4>
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
                <h1 class="card-title pricing-card-title">{{ item.price }} <small class="text-muted"> {{ item.discount }}</small></h1>
                <h4 class="card-title">
                  {{ item.name }}
                </h4>
                <h5>liders en pinturas</h5>
                <p class="card-text">
                  {{ item.sku }}
                </p>
                <button class="btn btn-sm btn-primary">
                  View Details
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
import { mapGetters } from 'vuex'
import Menu from '~/components/Menu.vue'

export default {
  components: {
    Menu
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  async asyncData (ctx) {
    return {
      items: await ctx.app.$products.index(),
      company: await ctx.app.$companies.index().then(data => data.find(i => i.companyId === ctx.companyId))
    }
  },
  data () {
    return {
      companyId: this.$auth.state.user.companyId,
      items: [],
      company: []
    }
  },
  methods: {
    editTo (item) {
      if (this.companyId) {
        this.$auth.$storage.setUniversal(`companyItem${item.id}`, item)
        this.$router.push(`/companies/${item.id}`)
      } else {
        swal('Aviso!', 'Debe seleccionar compania', 'error')
        this.$router.push('/companies')
      }
    }
  },
  head () {
    return {
      title: 'Products'
    }
  }
}
</script>

<style>

</style>
