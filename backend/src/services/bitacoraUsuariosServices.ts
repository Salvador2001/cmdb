import mysql from 'mysql2/promise';
import { BitacoraUsuario, BitacoraUsuarioNueva } from '../types/typesBitacoraUsuarios';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneBitacoraUsuarios = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraUsuarios');
        return results;
    } catch (err) {
        return { error: "No se puede obtener la bitácora de usuarios" };
    }
};

export const encuentraBitacoraUsuario = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM BitacoraUsuarios WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa bitácora de usuario" };
    }
};

export const agregarBitacoraUsuario = async (nueva: BitacoraUsuarioNueva) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO BitacoraUsuarios (fecha, operacion, usuario) VALUES (?, ?, ?)',
            [nueva.fecha, nueva.operacion, nueva.usuario]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar la bitácora de usuario" };
    }
};

export const modificarBitacoraUsuario = async (modificada: BitacoraUsuario) => {
    try {
        const [results] = await conexion.query(
            'UPDATE BitacoraUsuarios SET fecha=?, operacion=?, usuario=? WHERE id=?',
            [modificada.fecha, modificada.operacion, modificada.usuario, modificada.id]
        );
        return results;
    } catch (err) {
        return { error: "No se puede modificar la bitácora de usuario" };
    }
};

export const borrarBitacoraUsuario = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM BitacoraUsuarios WHERE id = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la bitácora de usuario" };
    }
};