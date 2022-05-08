import axios from 'axios'

const BASE_URL = 'http://localhost/api.php/'

const api = axios.create({
    baseURL: BASE_URL,
})
export default api