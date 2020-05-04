<template>
  <div>
    <Menu />
    <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-6">
            <form method="post" class="py-5" @submit.prevent="save">
              <h4 class="font-weight-light text-center text-primary">
                My Company
              </h4>
              <h2 class="font-weight-bold text-center mb-5 text-primary">
                {{ (created) ? 'Created' : 'Update' }} Product
              </h2>
              <div class="form-group">
                <label for="exampleInputEmail1">Name Product</label>
                <input
                  id="exampleInputEmail1"
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Product"
                  required
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">SKU</label>
                <input
                  id="exampleInputPassword1"
                  v-model="form.sku"
                  type="text"
                  class="form-control"
                  placeholder="Enter SKU"
                  required
                >
              </div>
              <div class="form-group">
                <div class="form-row">
                  <div class="col">
                    <label>Price</label>
                    <input
                      v-model="form.price"
                      type="number"
                      class="form-control"
                      placeholder="Price"
                      required
                      minlength="1"
                    >
                  </div>
                  <div class="col">
                    <label>Discount</label>
                    <input v-model="form.discount" type="number" class="form-control" placeholder="Discount">
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary text-uppercase">
                {{ (created) ? 'Created' : 'Update' }} Now
              </button>
            </form>
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
  data () {
    return {
      created: (this.$route.params.id === 'new'),
      form: this.$auth.$storage.getUniversal(`companyItem${this.$route.params.id}`) || {
        name: null,
        sku: null,
        price: 0,
        discount: 0
      },
      error: null
    }
  },
  methods: {
    async save () {
      try {
        const setData = {
          name: this.form.name,
          sku: this.form.sku,
          price: this.form.price,
          discount: this.form.discount
        }
        if (this.created) {
          await this.$products.create('', setData).then(data => swal('Exito!', 'Created', 'success'))
        } else {
          await this.$products.update(this.$route.params.id, setData).then(data => swal('Exito!', 'actualizado', 'success'))
        }
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
