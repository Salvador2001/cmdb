import axios from 'axios';

const softwareApi = axios.create({
    baseURL: '/api/software'
})

export default softwareApi;