import axios from 'axios'
axios.defaults.withCredentials = true
const BASE_URL = 'http://localhost/api.php/'

const api = axios.create({
    baseURL: BASE_URL,
})
export default api