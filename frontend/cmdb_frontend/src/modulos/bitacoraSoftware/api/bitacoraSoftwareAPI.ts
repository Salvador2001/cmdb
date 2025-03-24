import axios from 'axios';

const bitacoraSoftwareApi = axios.create({
    baseURL: '/api/bitacoraSoftware'
})

export default bitacoraSoftwareApi;