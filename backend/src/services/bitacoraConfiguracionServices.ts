import mysql from 'mysql2/promise';
import { BitacoraConfiguracion, BitacoraConfiguracionNueva } from '../types/typesBitacoraConfiguracion';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneBitacoraConfiguracion = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraConfiguracion');
        return results;
    } catch (err) {
        return { error: "No se puede obtener la bitácora de configuración" };
    }
}

export const encuentraBitacoraConfiguracion = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraConfiguracion WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa bitácora de configuración" };
    }
}

export const agregarBitacoraConfiguracion = async (nueva: BitacoraConfiguracionNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO BitacoraConfiguracion(tipo, fecha, configuracion) values (?,?,?)', [nueva.tipo, nueva.fecha, nueva.configuracion]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la bitácora de configuración" };
    }
}

export const modificarBitacoraConfiguracion = async (modificada: BitacoraConfiguracion) => {
    try {
        const [results] = await conexion.query('UPDATE BitacoraConfiguracion SET tipo=?, fecha=?, configuracion=? WHERE id=?', [modificada.tipo, modificada.fecha, modificada.configuracion, modificada.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la bitácora de configuración" };
    }
}

export const borrarBitacoraConfiguracion = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM BitacoraConfiguracion WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la bitácora de configuración" };
    }
}