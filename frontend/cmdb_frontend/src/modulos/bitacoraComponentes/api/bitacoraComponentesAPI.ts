import axios from 'axios';

const bitacoraComponentesApi = axios.create({
    baseURL: '/api/bitacoraComponentes'
})

export default bitacoraComponentesApi;