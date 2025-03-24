import axios from 'axios';

const ubicacionApi = axios.create({
    baseURL: '/api/ubicacion'
})

export default ubicacionApi;