import mysql from 'mysql2/promise';
import { BitacoraIncidencia, BitacoraIncidenciaNueva } from '../types/typesBitacoraIncidencias';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneBitacoraIncidencias = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraIncidencias');
        return results;
    } catch (err) {
        return { error: "No se puede obtener la bitácora de incidencias" };
    }
};

export const encuentraBitacoraIncidencia = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraIncidencias WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa bitácora de incidencia" };
    }
};

export const agregarBitacoraIncidencia = async (nueva: BitacoraIncidenciaNueva) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO BitacoraIncidencias (fecha, operacion, incidencia) VALUES (?, ?, ?)',
            [nueva.fecha, nueva.operacion, nueva.incidencia]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar la bitácora de incidencia" };
    }
};

export const modificarBitacoraIncidencia = async (modificada: BitacoraIncidencia) => {
    try {
        const [results] = await conexion.query(
            'UPDATE BitacoraIncidencias SET fecha=?, operacion=?, incidencia=? WHERE id=?',
            [modificada.fecha, modificada.operacion, modificada.incidencia, modificada.id]
        );
        return results;
    } catch (err) {
        return { error: "No se puede modificar la bitácora de incidencia" };
    }
};

export const borrarBitacoraIncidencia = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM BitacoraIncidencias WHERE id = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la bitácora de incidencia" };
    }
};