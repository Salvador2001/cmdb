import mysql from 'mysql2/promise';
import { Incidencia, IncidenciaNueva } from '../types/typesIncidencias';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneIncidencias = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Incidencias');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las incidencias" };
    }
}

export const encuentraIncidencia = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Incidencias WHERE id = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra la incidencia con esa id" };
    }
}

export const obtieneIncidenciasPorDepartamento = async (departamentoId: number) => {
    try {
        const [results] = await conexion.query(`
            SELECT 
                i.id,
                i.folio,
                i.descripcion,
                i.categoria,
                i.prioridad,
                i.estatus,
                i.fecha_creacion,
                i.fecha_resolucion,
                i.autor,
                i.configuracion,
                d.nombre AS departamento
            FROM 
                Incidencias i
            JOIN 
                Departamentos d ON i.departamento = d.id
            WHERE 
                d.id = ?;
        `, [departamentoId]);
        return results;
    } catch (err) {
        return { error: "No se pueden obtener las incidencias de ese departamento" };
    }
};

export const agregarIncidencia = async (nueva: IncidenciaNueva) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO Incidencias(folio, descripcion, categoria, prioridad, estatus, fecha_creacion, fecha_resolucion, autor, configuracion, departamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nueva.folio, nueva.descripcion, nueva.categoria, nueva.prioridad, nueva.estatus, nueva.fecha_creacion, nueva.fecha_resolucion, nueva.autor, nueva.configuracion, nueva.departamento]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar la incidencia" };
    }
}

export const modificarIncidencia = async (modificada: Incidencia) => {
    try {
        const [results] = await conexion.query(
            'UPDATE Incidencias SET folio=?, descripcion=?, categoria=?, prioridad=?, estatus=?, fecha_creacion=?, fecha_resolucion=?, autor=?, configuracion=?, departamento=? WHERE id=?',
            [modificada.folio, modificada.descripcion, modificada.categoria, modificada.prioridad, modificada.estatus, modificada.fecha_creacion, modificada.fecha_resolucion, modificada.autor, modificada.configuracion, modificada.departamento, modificada.id]
        );
        return results;
    } catch (err) {
        return { error: "No se puede modificar la incidencia" };
    }
}

export const borrarIncidencia = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Incidencias WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar la incidencia" };
    }
}