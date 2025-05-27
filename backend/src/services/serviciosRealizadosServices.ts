import mysql from 'mysql2/promise';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtenerServiciosRealizados = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM ServiciosRealizados');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los servicios realizados" };
    }
};

export const obtenerServiciosRealizadosId = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM ServiciosRealizados WHERE servicio_asignado = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede obtener el servicio realizado por ID" };
    }
};

export const agregarServicioRealizado = async (servicio_asignado: number, servicio_realizado: number) => {
    try {
        const [results] = await conexion.query(
            'INSERT INTO ServiciosRealizados(servicio_asignado, servicio_realizado) VALUES (?, ?)',
            [servicio_asignado, servicio_realizado]
        );
        return results;
    } catch (err) {
        return { error: "No se puede agregar el servicio realizado" };
    }
};

export const borrarServicioRealizado = async (servicio_asignado: number, servicio_realizado: number) => {
    try {
        const [results] = await conexion.query(
            'DELETE FROM ServiciosRealizados WHERE servicio_asignado = ? AND servicio_realizado = ?',
            [servicio_asignado, servicio_realizado]
        );
        return results;
    } catch (err) {
        return { error: "No se puede borrar el servicio realizado" };
    }
};