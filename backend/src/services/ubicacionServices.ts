import mysql from 'mysql2/promise';
import { Ubicacion, UbicacionNueva } from '../types/typesUbicacion';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneUbicaciones = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Ubicacion');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las ubicaciones" };
    }
}

export const encuentraUbicacion = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Ubicacion WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa ubicación" };
    }
}

export const agregarUbicacion = async (nueva: UbicacionNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO Ubicacion(nombre, tipo, edificio, departamento) values (?,?,?,?)', [nueva.nombre, nueva.tipo, nueva.edificio, nueva.departamento]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la ubicación" };
    }
}

export const modificarUbicacion = async (modificada: Ubicacion) => {
    try {
        const [results] = await conexion.query('UPDATE Ubicacion SET nombre=?, tipo=?, edificio=?, departamento=? WHERE id=?', [modificada.nombre, modificada.tipo, modificada.edificio, modificada.departamento, modificada.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la ubicación" };
    }
}

export const borrarUbicacion = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Ubicacion WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la ubicación" };
    }
}