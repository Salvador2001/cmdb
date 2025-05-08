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

export const obtieneSolicitudesCambioVista = async () => {
    try {
        const [results] = await conexion.query(`
            SELECT 
                sc.id AS id,
                i.folio AS incidencia,
                sc.descripcion AS descripcion,
                sc.estatus AS estatus,
                sc.presupuesto AS presupuesto,
                CONCAT(c.serial, ' - ', c.nombre) AS configuracion,
                sc.fecha AS fecha,
                sc.requiere_comite AS requiere_comite,
                u.nombre AS ubicacion
            FROM 
                SolicitudesCambio sc
            JOIN 
                Servicios s ON sc.servicio = s.id
            JOIN 
                Incidencias i ON s.incidencia = i.id
            JOIN 
                Configuraciones c ON i.configuracion = c.id
            JOIN 
                Ubicacion u ON c.ubicacion = u.id;
        `);
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las solicitudes de cambio en vista tabla" };
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

// export const encuentraSolicitudCambioVista = async (id: number) => {
//     try {
//         const [results] = await conexion.query(`
//             SELECT 
//                 sc.id AS solicitud_id,
//                 i.folio AS incidencia_folio,
//                 sc.descripcion AS solicitud_descripcion,
//                 sc.estatus AS solicitud_estatus,
//                 sc.presupuesto AS solicitud_presupuesto,
//                 CONCAT(c.serial, ' - ', c.nombre) AS configuracion,
//                 sc.fecha AS fecha_solicitud,
//                 sc.requiere_comite AS requiere_comite,
//                 u.nombre AS ubicacion
//             FROM 
//                 SolicitudesCambio sc
//             JOIN 
//                 Servicios s ON sc.servicio = s.id
//             JOIN 
//                 Incidencias i ON s.incidencia = i.id
//             JOIN 
//                 Configuraciones c ON i.configuracion = c.id
//             JOIN 
//                 Ubicacion u ON c.ubicacion = u.id;
//             WHERE sc.id = ?
//         `, [id]);
//         return results;
//     }
//     catch (err) {
//         return { error: "No se encuentra esa solicitud de cambio" };
//     }
// };

export const agregarSolicitudCambio = async (nueva: SolicitudCambioNueva) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO SolicitudesCambio (fecha, estatus, requiere_comite, servicio, descripcion, presupuesto) VALUES (?, ?, ?, ?, ?, ?)',
            [nueva.fecha, nueva.estatus, nueva.requiere_comite, nueva.servicio, nueva.descripcion, nueva.presupuesto]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar la solicitud de cambio" };
    }
};

export const modificarSolicitudCambio = async (modificada: SolicitudCambio) => {
    try {
        const [results] = await conexion.query(
            'UPDATE SolicitudesCambio SET fecha=?, estatus=?, requiere_comite=?, servicio=?, descripcion=?, presupuesto=? WHERE id=?',
            [modificada.fecha, modificada.estatus, modificada.requiere_comite, modificada.servicio, modificada.descripcion, modificada.presupuesto, modificada.id]
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