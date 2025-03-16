import mysql from 'mysql2/promise';
import { Hardware, HardwareNuevo } from '../types/typesHardware';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneHardware = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Hardware');
        return results;
    } catch (err) {
        return { error: "No se puede obtener el hardware" };
    }
}

export const encuentraHardware = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Hardware WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra ese hardware" };
    }
}

export const agregarHardware = async (nuevo: HardwareNuevo) => {
    try {
        const [results] = await conexion.query('INSERT INTO Hardware(nombre, fabricante, tipo, estatus, configuracion) values (?,?,?,?,?)', [nuevo.nombre, nuevo.fabricante, nuevo.tipo, nuevo.estatus, nuevo.configuracion]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar el hardware" };
    }
}

export const modificarHardware = async (modificado: Hardware) => {
    try {
        const [results] = await conexion.query('UPDATE Hardware SET nombre=?, fabricante=?, tipo=?, estatus=?, configuracion=? WHERE id=?', [modificado.nombre, modificado.fabricante, modificado.tipo, modificado.estatus, modificado.configuracion, modificado.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar el hardware" };
    }
}

export const borrarHardware = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Hardware WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el hardware" };
    }
}