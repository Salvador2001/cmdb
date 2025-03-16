import mysql from 'mysql2/promise';
import { Rol, RolNuevo } from '../types/typesRoles';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneRoles = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Roles');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los roles" };
    }
}

export const encuentraRol = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Roles WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra ese rol" };
    }
}

export const agregarRol = async (nuevo: RolNuevo) => {
    try {
        const [results] = await conexion.query('INSERT INTO Roles(nombre) values (?)', [nuevo.nombre]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar el rol" };
    }
}

export const modificarRol = async (modificado: Rol) => {
    try {
        const [results] = await conexion.query('UPDATE Roles SET nombre=? WHERE id=?', [modificado.nombre, modificado.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar el rol" };
    }
}

export const borrarRol = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Roles WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el rol" };
    }
}