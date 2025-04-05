import axios from 'axios';

const solicitudesCambioApi = axios.create({
    baseURL: '/api/solicitudes-cambio'
});

export default solicitudesCambioApi;