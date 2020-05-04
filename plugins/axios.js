import swal from 'sweetalert'
export default function ({ $axios }) {
  $axios.onError((error) => {
    return swal(`${error.response.status}`, `${error.response.statusText}`, 'error')
  })
}
