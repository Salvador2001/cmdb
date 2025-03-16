import mysql from 'mysql2/promise';
import { Especificacion, EspecificacionNueva } from '../types/typesEspecificaciones';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneEspecificaciones = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Especificaciones');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las especificaciones" };
    }
}

export const encuentraEspecificacion = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Especificaciones WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa especificación" };
    }
}

export const agregarEspecificacion = async (nueva: EspecificacionNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO Especificaciones(tipo, valor) values (?,?)', [nueva.tipo, nueva.valor]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la especificación" };
    }
}

export const modificarEspecificacion = async (modificada: Especificacion) => {
    try {
        const [results] = await conexion.query('UPDATE Especificaciones SET tipo=?, valor=? WHERE id=?', [modificada.tipo, modificada.valor, modificada.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la especificación" };
    }
}

export const borrarEspecificacion = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Especificaciones WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la especificación" };
    }
}