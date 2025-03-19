import mysql from 'mysql2/promise';
import { EspecificacionComponente, EspecificacionComponenteNueva } from '../types/typesEspecificacionesComponente';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneEspecificacionesComponente = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM EspecificacionesComponente');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las especificaciones de componente" };
    }
}

export const encuentraEspecificacionComponente = async (componente: number, especificacion: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM EspecificacionesComponente WHERE componente = ? AND especificacion = ? LIMIT 1', [componente, especificacion]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa especificación de componente" };
    }
}

export const agregarEspecificacionComponente = async (nueva: EspecificacionComponenteNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO EspecificacionesComponente(componente, especificacion) values (?,?)', [nueva.componente, nueva.especificacion]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la especificación de componente" };
    }
}

export const modificarEspecificacionComponente = async (modificada: EspecificacionComponente) => {
    try {
        const [results] = await conexion.query('UPDATE EspecificacionesComponente SET especificacion=? WHERE componente=? AND especificacion=?', [modificada.especificacion, modificada.componente, modificada.especificacion]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la especificación de componente" };
    }
}

export const borrarEspecificacionComponente = async (componente: number, especificacion: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM EspecificacionesComponente WHERE componente=? AND especificacion=?', [componente, especificacion]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la especificación de componente" };
    }
}