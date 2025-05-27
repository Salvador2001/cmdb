import axios from 'axios';

const catalogoServiciosApi = axios.create({
    baseURL: '/api/catalogo-servicios'
})

export default catalogoServiciosApi;