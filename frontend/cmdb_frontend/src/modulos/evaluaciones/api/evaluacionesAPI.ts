import axios from 'axios';

const evaluacionesApi = axios.create({
    baseURL: '/api/evaluaciones'
});

export default evaluacionesApi;