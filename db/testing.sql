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


-----
use cmdb;

SELECT 
    s.id AS software_id,
    s.nombre AS software_nombre,
    s.desarrollador AS software_desarrollador,
    s.tipo AS software_tipo,
    s.licencia AS software_licencia,
    s.version AS software_version,
    s.descripcion AS software_descripcion
FROM 
    ConjuntoSoftware cs
JOIN 
    Software s ON cs.software = s.id
WHERE 
    cs.configuracion = 2; -- Reemplaza '3' con el ID de la configuración deseada

select * from ConjuntoSoftware;

select * from Componentes;

--
use cmdb;

SELECT 
    sc.id AS solicitud_id,
    i.folio AS incidencia_folio,
    sc.descripcion AS solicitud_descripcion,
    sc.estatus AS solicitud_estatus,
    sc.presupuesto AS solicitud_presupuesto,
    CONCAT(c.serial, ' - ', c.nombre) AS configuracion,
    sc.fecha AS fecha_solicitud,
    sc.requiere_comite AS requiere_comite,
    u.nombre AS ubicacion
FROM 
    SolicitudesCambio sc
JOIN 
    Servicios s ON sc.servicio = s.id
JOIN 
    Incidencias i ON s.incidencia = i.id
JOIN 
    Configuraciones c ON i.configuracion = c.id
JOIN 
    Ubicacion u ON c.ubicacion = u.id;

use cmdb;
SELECT 
    c.id AS configuracion_id,
    c.serial AS configuracion_serial,
    c.nombre AS configuracion_nombre,
    c.tipo AS configuracion_tipo,
    c.fabricante AS configuracion_fabricante,
    c.estatus AS configuracion_estatus,
    c.fecha_compra AS configuracion_fecha_compra,
    c.rfc AS configuracion_rfc,
    u.id AS ubicacion
FROM 
    SolicitudesCambio sc
JOIN 
    Servicios s ON sc.servicio = s.id
JOIN 
    Incidencias i ON s.incidencia = i.id
JOIN 
    Configuraciones c ON i.configuracion = c.id
JOIN 
    Ubicacion u ON c.ubicacion = u.id
WHERE 
    sc.id = 1;

-- trae todas las configuraciones + incidencia_folio que existan en incidencias con un servicio relacionado
use cmdb;
SELECT 
    c.id AS id,
    i.folio AS incidencia_folio,
    c.serial AS serial,
    c.nombre AS nombre,
    c.tipo AS tipo,
    c.fabricante AS fabricante,
    c.estatus AS estatus,
    c.fecha_compra AS fecha_compra,
    c.rfc AS rfc,
    u.id AS ubicacion
FROM 
    Configuraciones c
JOIN 
    Incidencias i ON c.id = i.configuracion
JOIN 
    Servicios s ON i.id = s.incidencia
JOIN 
    Ubicacion u ON c.ubicacion = u.id;