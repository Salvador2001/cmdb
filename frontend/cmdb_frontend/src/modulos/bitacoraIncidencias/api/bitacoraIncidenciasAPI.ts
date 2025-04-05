import axios from 'axios';

const bitacoraIncidenciasApi = axios.create({
    baseURL: '/api/bitacora-incidencias'
});

export default bitacoraIncidenciasApi;