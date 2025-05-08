import axios from 'axios';

const conjuntoSoftwareApi = axios.create({
    baseURL: '/api/conjunto-software'
})

export default conjuntoSoftwareApi;