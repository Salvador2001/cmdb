import axios from 'axios';

const especificacionesComponenteApi = axios.create({
    baseURL: '/api/especificacionesComponente'
})

export default especificacionesComponenteApi;