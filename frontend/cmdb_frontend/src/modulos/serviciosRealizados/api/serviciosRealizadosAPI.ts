import axios from 'axios';

const serviciosRealizadosApi = axios.create({
    baseURL: '/api/servicios-realizados'
})

export default serviciosRealizadosApi;