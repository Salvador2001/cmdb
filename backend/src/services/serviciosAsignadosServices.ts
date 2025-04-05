import mysql from 'mysql2/promise';
import { ServicioAsignado, ServicioAsignadoNuevo } from '../types/typesServiciosAsignados';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneServiciosAsignados = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM ServiciosAsignados');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los servicios asignados" };
    }
}

export const encuentraServicioAsignado = async (servicio: number, responsable: number) => {
    try {
        const [results] = await conexion.query(
            'SELECT * FROM ServiciosAsignados WHERE servicio = ? AND responsable = ?',
            [servicio, responsable]
        );
        return results;
    } catch (err) {
        return { error: "No se encuentra el servicio asignado con esos datos" };
    }
}

export const agregarServicioAsignado = async (nuevo: ServicioAsignadoNuevo) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO ServiciosAsignados(servicio, responsable) VALUES (?, ?)',
            [nuevo.servicio, nuevo.responsable]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar el servicio asignado" };
    }
}

export const modificarServicioAsignado = async (modificado: ServicioAsignado) => {
    try {
        const [results] = await conexion.query('UPDATE ServiciosAsignados SET servicio=?, responsable=? WHERE servicio=? AND responsable=?', [modificado.servicio, modificado.responsable, modificado.servicio, modificado.responsable]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar el servicio asignado" };
    }
}

export const borrarServicioAsignado = async (servicio: number, responsable: number) => {
    try {
        const [results] = await conexion.query(
            'DELETE FROM ServiciosAsignados WHERE servicio = ? AND responsable = ?',
            [servicio, responsable]
        );
        return results;
    } catch (err) {
        return { error: "No se puede borrar el servicio asignado" };
    }
}