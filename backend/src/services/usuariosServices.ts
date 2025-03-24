import mysql from 'mysql2/promise';
import { Usuario, UsuarioNuevo } from '../types/typesUsuarios';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneUsuarios = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Usuarios');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los usuarios" };
    }
}

export const encuentraUsuario = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Usuarios WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra ese usuario" };
    }
}

export const agregarUsuario = async (nuevo: UsuarioNuevo) => {
    try {
        const [results] = await conexion.query('INSERT INTO Usuarios(nombre, rol, departamento) values (?,?,?)', [nuevo.nombre, nuevo.rol, nuevo.departamento]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar el usuario" };
    }
}

export const modificarUsuario = async (modificado: Usuario) => {
    try {
        const [results] = await conexion.query('UPDATE Usuarios SET nombre=?, rol=?, departamento=? WHERE id=?', [modificado.nombre, modificado.rol, modificado.departamento, modificado.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar el usuario" };
    }
}

export const borrarUsuario = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Usuarios WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el usuario" };
    }
}