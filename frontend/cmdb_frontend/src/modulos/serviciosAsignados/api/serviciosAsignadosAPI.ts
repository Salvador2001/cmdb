import axios from 'axios';

const serviciosAsignadosApi = axios.create({
    baseURL: '/api/servicios-asignados'
});

export default serviciosAsignadosApi;