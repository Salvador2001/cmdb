import axios from 'axios';

const incidenciasApi = axios.create({
    baseURL: '/api/incidencias'
});

export default incidenciasApi;