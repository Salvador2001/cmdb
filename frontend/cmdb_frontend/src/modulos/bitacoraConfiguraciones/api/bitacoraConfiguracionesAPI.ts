import axios from 'axios';

const bitacoraConfiguracionesApi = axios.create({
    baseURL: '/api/bitacoraConfiguraciones'
})

export default bitacoraConfiguracionesApi;