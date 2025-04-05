import mysql from 'mysql2/promise';
import { SolicitudCambio, SolicitudCambioNueva } from '../types/typesSolicitudesCambio';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneSolicitudesCambio = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM SolicitudesCambio');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las solicitudes de cambio" };
    }
};

export const encuentraSolicitudCambio = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM SolicitudesCambio WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa solicitud de cambio" };
    }
};

export const agregarSolicitudCambio = async (nueva: SolicitudCambioNueva) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO SolicitudesCambio (fecha, estatus, requiere_comite, servicio, folio) VALUES (?, ?, ?, ?, ?)',
            [nueva.fecha, nueva.estatus, nueva.requiere_comite, nueva.servicio, nueva.folio]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar la solicitud de cambio" };
    }
};

export const modificarSolicitudCambio = async (modificada: SolicitudCambio) => {
    try {
        const [results] = await conexion.query(
            'UPDATE SolicitudesCambio SET fecha=?, estatus=?, requiere_comite=?, servicio=?, folio=? WHERE id=?',
            [modificada.fecha, modificada.estatus, modificada.requiere_comite, modificada.servicio, modificada.folio, modificada.id]
        );
        return results;
    } catch (err) {
        return { error: "No se puede modificar la solicitud de cambio" };
    }
};

export const borrarSolicitudCambio = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM SolicitudesCambio WHERE id = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la solicitud de cambio" };
    }
};