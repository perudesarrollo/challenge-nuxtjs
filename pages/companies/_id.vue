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
                {{ (created) ? 'Created' : 'Update' }} Informaction
              </h2>
              <div class="form-group">
                <label for="exampleInputEmail1">Name Company</label>
                <input
                  id="exampleInputEmail1"
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Company"
                  required
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">RUC</label>
                <input
                  id="exampleInputPassword1"
                  v-model="form.ruc"
                  type="text"
                  class="form-control"
                  placeholder="Enter RUC"
                  required
                >
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
        ruc: null
      },
      error: null
    }
  },
  methods: {
    async save () {
      try {
        const setData = {
          name: this.form.name,
          ruc: this.form.ruc
        }
        if (this.created) {
          await this.$companies.create('/create_join', setData).then(data => swal('Exito!', 'Created', 'success'))
        } else {
          await this.$companies.update(this.$route.params.id, setData).then(data => swal('Exito!', 'actualizado', 'success'))
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
