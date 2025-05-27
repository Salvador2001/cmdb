import mysql from 'mysql2/promise';
import { CatalogoServicio, CatalogoServicioNuevo } from '../types/typesCatalogoServicios';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneCatalogoServicios = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM CatalogoServicios');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los servicios del catálogo" };
    }
}

export const encuentraCatalogoServicio = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM CatalogoServicios WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra ese servicio del catálogo" };
    }
}

export const agregarCatalogoServicio = async (nuevo: CatalogoServicioNuevo) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO CatalogoServicios(nombre, tiempo_estimado) VALUES (?, ?)',
            [nuevo.nombre, nuevo.tiempo_estimado]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar el servicio al catálogo" };
    }
}

export const modificarCatalogoServicio = async (modificado: CatalogoServicio) => {
    try {
        const [results] = await conexion.query(
            'UPDATE CatalogoServicios SET nombre=?, tiempo_estimado=? WHERE id=?',
            [modificado.nombre, modificado.tiempo_estimado, modificado.id]
        );
        return results;
    } catch (err) {
        return { error: "No se puede modificar el servicio del catálogo" };
    }
}

export const borrarCatalogoServicio = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM CatalogoServicios WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el servicio del catálogo" };
    }
}