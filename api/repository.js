// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default $axios => resource => ({

  index (params) {
    return $axios.$get(`${resource}`, { params })
  },

  show (id) {
    return $axios.$get(`${resource}/${id}`)
  },

  create (id = '', payload) {
    return $axios.$post(`${resource}${id}`, payload)
  },

  update (id, payload) {
    return $axios.$put(`${resource}/${id}`, payload)
  },

  delete (id) {
  }
})
