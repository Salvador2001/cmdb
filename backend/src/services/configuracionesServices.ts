import mysql from 'mysql2/promise';
import { Configuracion, ConfiguracionNueva } from '../types/typesConfiguraciones';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneConfiguraciones = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Configuraciones');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las configuraciones" };
    }
}

export const encuentraConfiguracion = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Configuraciones WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra esa configuración" };
    }
}

export const agregarConfiguracion = async (nueva: ConfiguracionNueva) => {
    try {
        const [results] = await conexion.query('INSERT INTO Configuraciones(nombre, fabricante, tipo, estatus, ubicacion) values (?,?,?,?,?)', [nueva.nombre, nueva.fabricante, nueva.tipo, nueva.estatus, nueva.ubicacion]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar la configuración" };
    }
}

export const modificarConfiguracion = async (modificada: Configuracion) => {
    try {
        const [results] = await conexion.query('UPDATE Configuraciones SET nombre=?, fabricante=?, tipo=?, estatus=?, ubicacion=? WHERE id=?', [modificada.nombre, modificada.fabricante, modificada.tipo, modificada.estatus, modificada.ubicacion, modificada.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar la configuración" };
    }
}

export const borrarConfiguracion = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Configuraciones WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la configuración" };
    }
}