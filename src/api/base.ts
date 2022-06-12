import axios from 'axios'
axios.defaults.withCredentials = true
const BASE_URL = 'https://cinqplusdeuxegalcinq.alwaysdata.net/api.php/'

const api = axios.create({
    baseURL: BASE_URL,
})


export interface ErrorInterface {
    error: string;
}


export default api