import mysql from 'mysql2/promise';
import { IncidenciaProblema } from '../types/typesIncidenciasProblema';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneIncidenciasProblema = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM IncidenciasProblema');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las relaciones incidencia-problema" };
    }
}

export const encuentraIncidenciasProblema = async ( problema: number) => {
    try {
        const [results] = await conexion.query(
            'SELECT * FROM IncidenciasProblema WHERE problema = ?',
            [problema]
        );
        return results;
    } catch (err) {
        return { error: "No se encuentra esa relación incidencia-problema" };
    }
}

export const agregarIncidenciaProblema = async (nueva: IncidenciaProblema) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO IncidenciasProblema(incidencia, problema) VALUES (?, ?)',
            [nueva.incidencia, nueva.problema]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar la relación incidencia-problema" };
    }
}

export const borrarIncidenciaProblema = async (incidencia: number, problema: number) => {
    try {
        const [results] = await conexion.query(
            'DELETE FROM IncidenciasProblema WHERE incidencia = ? AND problema = ?',
            [incidencia, problema]
        );
        return results;
    } catch (err) {
        return { error: "No se puede borrar la relación incidencia-problema" };
    }
}