import axios from 'axios';

const rolesApi = axios.create({
    baseURL: '/api/roles'
})

export default rolesApi;