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

export const encuentraServicioPorIncidencia = async (incidencia: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Servicios WHERE incidencia = ?', [incidencia]);
        return results;
    } catch (err) {
        return { error: "No se encuentra el servicio con esa incidencia" };
    }
}

export const encuentraServicioPorFolioIncidencia = async (folio: string) => {
    try {
        const [results] = await conexion.query(
            `SELECT s.* 
             FROM Servicios s
             JOIN Incidencias i ON s.incidencia = i.id
             WHERE i.folio = ?`, 
            [folio]
        );
        return results;
    } catch (err) {
        return { error: "No se encuentra el servicio con ese folio de incidencia" };
    }
};       

export const encuentraServicioPorResponsable = async (responsable: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Servicios WHERE responsable = ?', [responsable]);
        return results;
    } catch (err) {
        return { error: "No se encuentra el servicio con ese responsable" };
    }
}

export const agregarServicio = async (nuevo: ServicioNuevo) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO Servicios(tipo, incidencia, responsable, diagnostico) VALUES (?, ?, ?, ?)',
            [nuevo.tipo, nuevo.incidencia, nuevo.responsable, nuevo.diagnostico]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar el servicio" };
    }
}

export const modificarServicio = async (modificado: Servicio) => {
    try {
        const [results] = await conexion.query(
            'UPDATE Servicios SET tipo=?, incidencia=?, responsable=?, diagnostico=? WHERE id=?',
            [modificado.tipo, modificado.incidencia, modificado.responsable, modificado.diagnostico, modificado.id]
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