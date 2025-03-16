import mysql from 'mysql2/promise';
import { Departamento, DepartamentoNuevo } from '../types/typesDepartamentos';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneDepartamentos = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Departamentos');
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los departamentos" };
    }
}

export const encuentraDepartamento = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Departamentos WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentra ese departamento" };
    }
}

export const agregarDepartamento = async (nuevo: DepartamentoNuevo) => {
    try {
        const [results] = await conexion.query('INSERT INTO Departamentos(nombre, carrera) values (?,?)', [nuevo.nombre, nuevo.carrera]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar el departamento" };
    }
}

export const modificarDepartamento = async (modificado: Departamento) => {
    try {
        const [results] = await conexion.query('UPDATE Departamentos SET nombre=?, carrera=? WHERE id=?', [modificado.nombre, modificado.carrera, modificado.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar el departamento" };
    }
}

export const borrarDepartamento = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Departamentos WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el departamento" };
    }
}