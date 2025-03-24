import axios from 'axios';

const credencialesApi = axios.create({
    baseURL: '/api/credenciales'
})

export default credencialesApi;