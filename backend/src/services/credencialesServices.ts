import mysql from 'mysql2/promise';
import { Credencial, CredencialNueva } from '../types/typesCredenciales';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneCredenciales = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Credenciales');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las credenciales" };
    }
}

export const encuentraCredencial = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Credenciales WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa credencial" };
    }
}

export const encuentraCredencialPorCorreo = async (correo: string) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Credenciales WHERE correo = ? LIMIT 1', [correo]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa credencial con ese correo" };
    }
}

export const encuentraCredencialPorAuth = async (correo: string, contrasenia: string) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Credenciales WHERE correo = ? AND contrasenia = ? LIMIT 1', [correo, contrasenia]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa credencial con esa autenticación" };
    }
}

export const agregarCredencial = async (nuevo: CredencialNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO Credenciales(correo, contrasenia, usuario) values (?,?,?)', [nuevo.correo, nuevo.contrasenia, nuevo.usuario]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la credencial" };
    }
}

export const modificarCredencial = async (modificado: Credencial) => {
    try {
        const [results] = await conexion.query('UPDATE Credenciales SET correo=?, contrasenia=?, usuario=? WHERE id=?', [modificado.correo, modificado.contrasenia, modificado.usuario, modificado.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la credencial" };
    }
}

export const borrarCredencial = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Credenciales WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la credencial" };
    }
}