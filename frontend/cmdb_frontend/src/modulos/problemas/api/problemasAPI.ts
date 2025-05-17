import axios from 'axios';

const problemasApi = axios.create({
    baseURL: '/api/problemas'
});

export default problemasApi;