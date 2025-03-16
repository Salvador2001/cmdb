import mysql from 'mysql2/promise';
import { BitacoraHardware, BitacoraHardwareNueva } from '../types/typesBitacoraHardware';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneBitacoraHardware = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraHardware');
        return results;
    } catch (err) {
        return { error: "No se puede obtener la bitácora de hardware" };
    }
}

export const encuentraBitacoraHardware = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraHardware WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa bitácora de hardware" };
    }
}

export const agregarBitacoraHardware = async (nueva: BitacoraHardwareNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO BitacoraHardware(tipo, fecha, hardware) values (?,?,?)', [nueva.tipo, nueva.fecha, nueva.hardware]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la bitácora de hardware" };
    }
}

export const modificarBitacoraHardware = async (modificada: BitacoraHardware) => {
    try {
        const [results] = await conexion.query('UPDATE BitacoraHardware SET tipo=?, fecha=?, hardware=? WHERE id=?', [modificada.tipo, modificada.fecha, modificada.hardware, modificada.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la bitácora de hardware" };
    }
}

export const borrarBitacoraHardware = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM BitacoraHardware WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la bitácora de hardware" };
    }
}