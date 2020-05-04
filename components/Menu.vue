<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-primary border-bottom shadow-sm">
    <div class="my-0 mr-md-auto">
      <logo />
    </div>
    <nav class="my-2 my-md-0 mr-md-3">
      <NLink class="p-2 text-white" to="/companies">
        Companies
      </NLink>
      <NLink class="p-2 text-white" to="/products">
        Products
      </NLink>
      <NLink v-if="!loggedInUser" class="p-2 text-white" to="/login">
        Login
      </NLink>
      <NLink v-if="!loggedInUser" class="p-2 text-white" to="/register">
        Register
      </NLink>
      <NLink v-if="loggedInUser" class="p-2 text-white" to="/profile">
        {{ loggedInUser.name }} <i class="fa fa-user-circle text-white" aria-hidden="true" />
      </NLink>
      <button v-if="loggedInUser" class="btn btn-danger" @click="logout">
        Logout
      </button>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
