import axios from 'axios';

const especificacionesConfiguracionApi = axios.create({
    baseURL: '/api/especificacionesConfiguracion'
})

export default especificacionesConfiguracionApi;