create database testbackend;
use testbackend;

CREATE TABLE personal (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(200) DEFAULT NULL,
  direccion varchar(300) DEFAULT NULL,
  telefono varchar(15) DEFAULT NULL,
  estatus varchar(1) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

use testbackend;
INSERT INTO personal (nombre, direccion, telefono, estatus)
VALUES
    ("Programacion", "conocida","77777","1");

use cmdb;

SELECT 
    c.id,
    c.nombre,
    c.fabricante,
    c.tipo,
    c.estatus,
    u.nombre AS ubicacion,
    d.nombre AS departamento
FROM 
    Configuraciones c
JOIN 
    Ubicacion u ON c.ubicacion = u.id
JOIN 
    Departamentos d ON u.departamento = d.id
WHERE 
    d.id = 1;
select * from `Credenciales` WHERE correo = 'carlos.perez@example.com' AND contrasenia = 'asd';

--------

use cmdb;

UPDATE Incidencias
SET 
    folio = 'INC003',
    descripcion = 'Problema de red en oficina',
    categoria = 'Red',
    prioridad = 'Alta',
    estatus = 'Cerrada',
    fecha_creacion = '2023-10-03T09:15:00.000Z',
    autor = 3,
    configuracion = 3,
    departamento = 3
WHERE 
    id = 3;