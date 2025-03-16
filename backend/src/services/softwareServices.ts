import mysql from 'mysql2/promise';
import { Software, SoftwareNuevo } from '../types/typesSoftware';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneSoftware = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Software');
        return results;
    } catch (err) {
        return { error: "No se puede obtener el software" };
    }
}

export const encuentraSoftware = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Software WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra ese software" };
    }
}

export const agregarSoftware = async (nuevo: SoftwareNuevo) => {
    try {
        const [results] = await conexion.query('INSERT INTO Software(nombre, desarrollador, tipo, licencia, version, descripcion) values (?,?,?,?,?,?)', [nuevo.nombre, nuevo.desarrollador, nuevo.tipo, nuevo.licencia, nuevo.version, nuevo.descripcion]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar el software" };
    }
}

export const modificarSoftware = async (modificado: Software) => {
    try {
        const [results] = await conexion.query('UPDATE Software SET nombre=?, desarrollador=?, tipo=?, licencia=?, version=?, descripcion=? WHERE id=?', [modificado.nombre, modificado.desarrollador, modificado.tipo, modificado.licencia, modificado.version, modificado.descripcion, modificado.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar el software" };
    }
}

export const borrarSoftware = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Software WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el software" };
    }
}
