import mysql from 'mysql2/promise';
import { Evaluacion, EvaluacionNueva } from '../types/typesEvaluaciones';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneEvaluaciones = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Evaluaciones');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las evaluaciones" };
    }
};

export const agregarEvaluacion = async (nueva: EvaluacionNueva) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO Evaluaciones (fecha, puntuacion, comentario, evaluador, servicio) VALUES (?, ?, ?, ?, ?)',
            [nueva.fecha, nueva.puntuacion, nueva.comentario, nueva.evaluador, nueva.servicio]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar la evaluación" };
    }
};

export const modificarEvaluacion = async (modificada: Evaluacion) => {
    try {
        const [results] = await conexion.query(
            'UPDATE Evaluaciones SET fecha=?, puntuacion=?, comentario=?, evaluador=?, servicio=? WHERE id=?',
            [modificada.fecha, modificada.puntuacion, modificada.comentario, modificada.evaluador, modificada.servicio, modificada.id]
        );
        return results;
    } catch (err) {
        return { error: "No se puede modificar la evaluación" };
    }
};

export const borrarEvaluacion = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Evaluaciones WHERE id = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la evaluación" };
    }
};