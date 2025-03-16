import mysql from 'mysql2/promise';
import { EspecificacionConfiguracion, EspecificacionConfiguracionNueva } from '../types/typesEspecificacionesConfiguracion';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneEspecificacionesConfiguracion = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM EspecificacionesConfiguracion');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las especificaciones de configuración" };
    }
}

export const encuentraEspecificacionConfiguracion = async (configuracion: number, especificacion: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM EspecificacionesConfiguracion WHERE configuracion = ? AND especificacion = ? LIMIT 1', [configuracion, especificacion]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa especificación de configuración" };
    }
}

export const agregarEspecificacionConfiguracion = async (nueva: EspecificacionConfiguracionNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO EspecificacionesConfiguracion(configuracion, especificacion) values (?,?)', [nueva.configuracion, nueva.especificacion]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la especificación de configuración" };
    }
}

export const modificarEspecificacionConfiguracion = async (modificada: EspecificacionConfiguracion) => {
    try {
        const [results] = await conexion.query('UPDATE EspecificacionesConfiguracion SET especificacion=? WHERE configuracion=? AND especificacion=?', [modificada.especificacion, modificada.configuracion, modificada.especificacion]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la especificación de configuración" };
    }
}

export const borrarEspecificacionConfiguracion = async (configuracion: number, especificacion: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM EspecificacionesConfiguracion WHERE configuracion=? AND especificacion=?', [configuracion, especificacion]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la especificación de configuración" };
    }
}