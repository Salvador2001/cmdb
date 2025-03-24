import mysql from 'mysql2/promise';
import { Componente, ComponenteNuevo } from '../types/typesComponentes';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prueba123",
    database: "cmdb",
    port: 3306,
    multipleStatements: false
});

export const obtieneComponentes = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM Componentes');
        return results;
    } catch (err) {
        return { error: "No se puede obtener los componentes" };
    }
}

export const encuentraComponente = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM Componentes WHERE id = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se encuentran componentes con esa id" };
    }
}

export const agregarComponente = async (nuevo: ComponenteNuevo) => {
    try {
        const [results] = await conexion.query('INSERT INTO Componentes(nombre, fabricante, tipo, estatus, configuracion) values (?,?,?,?,?)', [nuevo.nombre, nuevo.fabricante, nuevo.tipo, nuevo.estatus, nuevo.configuracion]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar el componente" };
    }
}

export const modificarComponente = async (modificado: Componente) => {
    try {
        const [results] = await conexion.query('UPDATE Componentes SET nombre=?, fabricante=?, tipo=?, estatus=?, configuracion=? WHERE id=?', [modificado.nombre, modificado.fabricante, modificado.tipo, modificado.estatus, modificado.configuracion, modificado.id]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar el componente" };
    }
}

export const borrarComponente = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM Componentes WHERE id=?', [id]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el componente" };
    }
}