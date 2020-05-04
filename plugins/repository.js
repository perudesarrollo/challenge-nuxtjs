// import { mapGetters } from 'vuex'
import createRepository from '~/api/repository'
export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const repositoryWithAxios = createRepository(ctx.$axios)
  inject('companies', repositoryWithAxios('api/companies'))
  inject('register', repositoryWithAxios('api/auth'))
  inject('users', repositoryWithAxios('api/users'))
  inject('products', repositoryWithAxios('api/products'))
}
