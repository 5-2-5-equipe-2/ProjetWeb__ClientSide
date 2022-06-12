import axios from 'axios'
axios.defaults.withCredentials = true
const BASE_URL = 'http://fileszfhjsdbn.alwaysdata.net/'

const api = axios.create({
    baseURL: BASE_URL,
})
export default api