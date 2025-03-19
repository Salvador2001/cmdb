import mysql from 'mysql2/promise';
import { BitacoraConfiguraciones, BitacoraConfiguracionesNueva } from '../types/typesBitacoraConfiguraciones';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneBitacoraConfiguraciones = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraConfiguraciones');
        return results;
    } catch (err) {
        return { error: "No se puede obtener la bitácora de configuraciones" };
    }
}

export const encuentraBitacoraConfiguraciones = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraConfiguraciones WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa bitácora de configuraciones" };
    }
}

export const agregarBitacoraConfiguraciones = async (nueva: BitacoraConfiguracionesNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO BitacoraConfiguraciones(operacion, fecha, configuracion) values (?,?,?)', [nueva.operacion, nueva.fecha, nueva.configuracion]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la bitácora de configuraciones" };
    }
}

export const modificarBitacoraConfiguraciones = async (modificada: BitacoraConfiguraciones) => {
    try {
        const [results] = await conexion.query('UPDATE BitacoraConfiguraciones SET operacion=?, fecha=?, configuracion=? WHERE id=?', [modificada.operacion, modificada.fecha, modificada.configuracion, modificada.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la bitácora de configuraciones" };
    }
}

export const borrarBitacoraConfiguraciones = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM BitacoraConfiguraciones WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la bitácora de configuraciones" };
    }
}