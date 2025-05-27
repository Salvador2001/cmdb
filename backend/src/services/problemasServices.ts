import mysql from 'mysql2/promise';
import { Problema, ProblemaNuevo } from '../types/typesProblemas';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneProblemas = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Problemas');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los problemas" };
    }
}

export const encuentraProblema = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Problemas WHERE id = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra el problema con ese id" };
    }
}

export const agregarProblema = async (nuevo: ProblemaNuevo) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO Problemas (folio, error_conocido, causa_raiz, solucion, estatus, fecha_creacion, fecha_resolucion, autor, departamento, responsable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nuevo.folio, nuevo.error_conocido, nuevo.causa_raiz, nuevo.solucion, nuevo.estatus, nuevo.fecha_creacion, nuevo.fecha_resolucion, nuevo.autor, nuevo.departamento, nuevo.responsable]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar el problema" };
    }
}

export const editarProblema = async (modificada: Problema) => {
    try {
        const [results] = await conexion.query(
            'UPDATE Problemas SET folio=?, error_conocido=?, causa_raiz=?, solucion=?, estatus=?, fecha_creacion=?, fecha_resolucion=?, autor=?, departamento=?, responsable=? WHERE id=?',
            [modificada.folio, modificada.error_conocido, modificada.causa_raiz, modificada.solucion, modificada.estatus, modificada.fecha_creacion, modificada.fecha_resolucion, modificada.autor, modificada.departamento, modificada.responsable, modificada.id]
        );
        return results;
    } catch (err) {
        return { error: "No se puede editar el problema" };
    }
}

export const borrarProblema = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Problemas WHERE id = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el problema" };
    }
}