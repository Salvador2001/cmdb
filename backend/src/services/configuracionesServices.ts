import mysql from 'mysql2/promise';
import { Configuracion, ConfiguracionNueva } from '../types/typesConfiguraciones';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneConfiguraciones = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Configuraciones');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las configuraciones" };
    }
}

export const obtieneConfiguracionesPorDepartamento = async (departamentoId: number) => {
    try {
        const [results] = await conexion.query(`
            SELECT 
                c.id,
                c.nombre,
                c.fabricante,
                c.tipo,
                c.estatus,
                u.nombre AS ubicacion,
                c.serial,
                c.fecha_compra,
                c.rfc,
                d.nombre AS departamento
            FROM 
                Configuraciones c
            JOIN 
                Ubicacion u ON c.ubicacion = u.id
            JOIN 
                Departamentos d ON u.departamento = d.id
            WHERE 
                d.id = ?;
        `, [departamentoId]);
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las configuraciones de ese departamento" };
    }
};

export const obtieneConfiguracionesConServicio = async () => {
    try {
        const [results] = await conexion.query(`
            SELECT 
                c.id AS id,
                i.folio AS folio_incidencia,
                c.serial AS serial,
                c.nombre AS nombre,
                c.tipo AS tipo,
                c.fabricante AS fabricante,
                c.estatus AS estatus,
                c.fecha_compra AS fecha_compra,
                c.rfc AS rfc,
                u.id AS ubicacion
            FROM 
                Configuraciones c
            JOIN 
                Incidencias i ON c.id = i.configuracion
            JOIN 
                Servicios s ON i.id = s.incidencia
            JOIN 
                Ubicacion u ON c.ubicacion = u.id;
        `);
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las configuraciones con servicio" };
    }
};

export const encuentraConfiguracion = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Configuraciones WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa configuración" };
    }
}

export const encuentraConfiguracionPorRFC = async (rfc: string) => {
    try {
        const [results] = await conexion.query(`
            SELECT 
                c.id AS id,
                c.serial AS serial,
                c.nombre AS nombre,
                c.tipo AS tipo,
                c.fabricante AS fabricante,
                c.estatus AS estatus,
                c.fecha_compra AS fecha_compra,
                c.rfc AS rfc,
                u.id AS ubicacion
            FROM 
                SolicitudesCambio sc
            JOIN 
                Servicios s ON sc.servicio = s.id
            JOIN 
                Incidencias i ON s.incidencia = i.id
            JOIN 
                Configuraciones c ON i.configuracion = c.id
            JOIN 
                Ubicacion u ON c.ubicacion = u.id
            WHERE sc.id = ?;
        `, [rfc]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa configuración por tal RFC" };
    }
}

export const agregarConfiguracion = async (nueva: ConfiguracionNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO Configuraciones(nombre, fabricante, tipo, estatus, ubicacion, serial, fecha_compra, rfc) values (?,?,?,?,?,?,?,?)', [nueva.nombre, nueva.fabricante, nueva.tipo, nueva.estatus, nueva.ubicacion, nueva.serial, nueva.fecha_compra, nueva.rfc]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la configuración" };
    }
}

export const modificarConfiguracion = async (modificada: Configuracion) => {
    try {
        const [results] = await conexion.query('UPDATE Configuraciones SET nombre=?, fabricante=?, tipo=?, estatus=?, ubicacion=?, serial=?, fecha_compra=?, rfc=? WHERE id=?', [modificada.nombre, modificada.fabricante, modificada.tipo, modificada.estatus, modificada.ubicacion, modificada.serial, modificada.fecha_compra, modificada.rfc, modificada.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la configuración" };
    }
}

export const borrarConfiguracion = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Configuraciones WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la configuración" };
    }
}