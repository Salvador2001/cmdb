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