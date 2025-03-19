import mysql from 'mysql2/promise';
import { BitacoraSoftware, BitacoraSoftwareNueva } from '../types/typesBitacoraSoftware';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneBitacoraSoftware = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraSoftware');
        return results;
    } catch (err) {
        return { error: "No se puede obtener la bitácora de software" };
    }
}

export const encuentraBitacoraSoftware = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraSoftware WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa bitácora de software" };
    }
}

export const agregarBitacoraSoftware = async (nueva: BitacoraSoftwareNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO BitacoraSoftware(operacion, fecha, configuracion, software) values (?,?,?,?)', [nueva.operacion, nueva.fecha, nueva.configuracion, nueva.software]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la bitácora de software" };
    }
}

export const modificarBitacoraSoftware = async (modificada: BitacoraSoftware) => {
    try {
        const [results] = await conexion.query('UPDATE BitacoraSoftware SET operacion=?, fecha=?, configuracion=?, software=? WHERE id=?', [modificada.operacion, modificada.fecha, modificada.configuracion, modificada.software, modificada.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la bitácora de software" };
    }
}

export const borrarBitacoraSoftware = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM BitacoraSoftware WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la bitácora de software" };
    }
}