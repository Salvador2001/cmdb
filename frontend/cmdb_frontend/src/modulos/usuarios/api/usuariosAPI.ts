import axios from 'axios';

const usuariosApi = axios.create({
    baseURL: '/api/usuarios'
})

export default usuariosApi;