import axios from 'axios';

const conjuntoSoftwareApi = axios.create({
    baseURL: '/api/conjuntoSoftware'
})

export default conjuntoSoftwareApi;