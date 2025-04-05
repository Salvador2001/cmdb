import mysql from 'mysql2/promise';
import { Servicio, ServicioNuevo } from '../types/typesServicios';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneServicios = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Servicios');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los servicios" };
    }
}

export const encuentraServicio = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Servicios WHERE id = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra el servicio con esa id" };
    }
}

export const agregarServicio = async (nuevo: ServicioNuevo) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO Servicios(tipo, incidencia) VALUES (?, ?)',
            [nuevo.tipo, nuevo.incidencia]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar el servicio" };
    }
}

export const modificarServicio = async (modificado: Servicio) => {
    try {
        const [results] = await conexion.query(
            'UPDATE Servicios SET tipo=?, incidencia=? WHERE id=?',
            [modificado.tipo, modificado.incidencia, modificado.id]
        );
        return results;
    } catch (err) {
        return { error: "No se puede modificar el servicio" };
    }
}

export const borrarServicio = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Servicios WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el servicio" };
    }
}