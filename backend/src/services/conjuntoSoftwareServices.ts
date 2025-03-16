import mysql from 'mysql2/promise';
import { ConjuntoSoftware, ConjuntoSoftwareNuevo } from '../types/typesConjuntoSoftware';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneConjuntoSoftware = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM ConjuntoSoftware');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los conjuntos de software" };
    }
}

export const encuentraConjuntoSoftware = async (configuracion: number, software: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM ConjuntoSoftware WHERE configuracion = ? AND software = ? LIMIT 1', [configuracion, software]);
        return results;
    } catch (err) {
        return { error: "No se encuentra ese conjunto de software" };
    }
}

export const agregarConjuntoSoftware = async (nuevo: ConjuntoSoftwareNuevo) => {
    try {
        const [results] = await conexion.query('INSERT INTO ConjuntoSoftware(configuracion, software) values (?,?)', [nuevo.configuracion, nuevo.software]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar el conjunto de software" };
    }
}

export const modificarConjuntoSoftware = async (modificado: ConjuntoSoftware) => {
    try {
        const [results] = await conexion.query('UPDATE ConjuntoSoftware SET configuracion=?, software=? WHERE configuracion=? AND software=?', [modificado.configuracion, modificado.software, modificado.configuracion, modificado.software]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar el conjunto de software" };
    }
}

export const borrarConjuntoSoftware = async (configuracion: number, software: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM ConjuntoSoftware WHERE configuracion=? AND software=?', [configuracion, software]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el conjunto de software" };
    }
}