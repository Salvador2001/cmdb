import axios from "axios";

const incidenciasProblemaApi = axios.create({
    baseURL: "/api/incidencias-problema"
});

export default incidenciasProblemaApi;