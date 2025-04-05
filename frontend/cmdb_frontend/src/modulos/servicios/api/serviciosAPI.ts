import axios from 'axios';

const serviciosApi = axios.create({
    baseURL: '/api/servicios'
});

export default serviciosApi;