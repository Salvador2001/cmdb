import mysql from 'mysql2/promise';
import { EspecificacionHardware, EspecificacionHardwareNueva } from '../types/typesEspecificacionesHardware';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneEspecificacionesHardware = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM EspecificacionesHardware');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las especificaciones de hardware" };
    }
}

export const encuentraEspecificacionHardware = async (hardware: number, especificacion: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM EspecificacionesHardware WHERE hardware = ? AND especificacion = ? LIMIT 1', [hardware, especificacion]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa especificación de hardware" };
    }
}

export const agregarEspecificacionHardware = async (nueva: EspecificacionHardwareNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO EspecificacionesHardware(hardware, especificacion) values (?,?)', [nueva.hardware, nueva.especificacion]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la especificación de hardware" };
    }
}

export const modificarEspecificacionHardware = async (modificada: EspecificacionHardware) => {
    try {
        const [results] = await conexion.query('UPDATE EspecificacionesHardware SET especificacion=? WHERE hardware=? AND especificacion=?', [modificada.especificacion, modificada.hardware, modificada.especificacion]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la especificación de hardware" };
    }
}

export const borrarEspecificacionHardware = async (hardware: number, especificacion: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM EspecificacionesHardware WHERE hardware=? AND especificacion=?', [hardware, especificacion]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la especificación de hardware" };
    }
}