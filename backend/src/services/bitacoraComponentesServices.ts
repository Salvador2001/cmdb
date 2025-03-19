import mysql from 'mysql2/promise';
import { BitacoraComponentes, BitacoraComponentesNueva } from '../types/typesBitacoraComponentes';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneBitacoraComponentes = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraComponentes');
        return results;
    } catch (err) {
        return { error: "No se puede obtener la bitácora de componentes" };
    }
}

export const encuentraBitacoraComponentes = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraComponentes WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa bitácora de componentes" };
    }
}

export const agregarBitacoraComponentes = async (nueva: BitacoraComponentesNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO BitacoraComponentes(operacion, fecha, componente) values (?,?,?)', [nueva.operacion, nueva.fecha, nueva.componente]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la bitácora de componentes" };
    }
}

export const modificarBitacoraComponentes = async (modificada: BitacoraComponentes) => {
    try {
        const [results] = await conexion.query('UPDATE BitacoraComponentes SET operacion=?, fecha=?, componente=? WHERE id=?', [modificada.operacion, modificada.fecha, modificada.componente, modificada.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la bitácora de componentes" };
    }
}

export const borrarBitacoraComponentes = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM BitacoraComponentes WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la bitácora de componentes" };
    }
}