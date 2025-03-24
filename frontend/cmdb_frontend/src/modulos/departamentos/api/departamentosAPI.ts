import axios from 'axios';

const departamentosApi = axios.create({
    baseURL: '/api/departamentos'
})

export default departamentosApi;