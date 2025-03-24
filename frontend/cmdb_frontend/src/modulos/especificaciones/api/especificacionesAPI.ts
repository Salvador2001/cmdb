import axios from 'axios';

const especificacionesApi = axios.create({
    baseURL: '/api/especificaciones'
})

export default especificacionesApi;