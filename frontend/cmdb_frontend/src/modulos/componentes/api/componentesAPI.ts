import axios from 'axios';

const componentesApi = axios.create({
    baseURL: '/api/componentes'
})

export default componentesApi;