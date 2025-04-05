import axios from 'axios';

const bitacoraUsuariosApi = axios.create({
    baseURL: '/api/bitacora-usuarios'
});

export default bitacoraUsuariosApi;