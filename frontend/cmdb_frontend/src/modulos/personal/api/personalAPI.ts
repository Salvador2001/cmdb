import axios from 'axios';

const personalApi = axios.create({
    //  workaround para codespaces, eliminar en prod
    //baseURL: 'http://localhost:3001/api/personal'
    baseURL: '/api/personal'
})

export default personalApi