import axios from 'axios';

const configuracionesApi = axios.create({
    baseURL: '/api/configuraciones'
})

export default configuracionesApi;