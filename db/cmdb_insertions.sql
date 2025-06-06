-- Las siguiente inserciones son de prueba, la mayoría no contiene datos correctos.

USE cmdb;

INSERT INTO Software (nombre, desarrollador, tipo, licencia, version, descripcion)
VALUES 
    ('Windows 10', 'Microsoft', 'SO', 'OEM', '10.0', 'Sistema operativo de escritorio de Microsoft.'),
    ('LibreOffice', 'The Document Foundation', 'Hojas de texto', 'GPL', '7.3', 'Suite ofimática gratuita y de código abierto.'),
    ('Google Chrome', 'Google', 'Navegador', 'Freeware', '96.0.4664.110', 'Navegador web rápido y seguro.'),
    ('IntelliJ IDEA', 'JetBrains', 'IDE', 'Commercial', '2021.1', 'Entorno de desarrollo para Java y otros lenguajes.'),
    ('Photoshop', 'Adobe', 'Edición de imágenes', 'Licencia propietaria', '2021.2', 'Software profesional de edición de imágenes.');

INSERT INTO Roles (nombre)
VALUES 
    ('Administrador'),
    ('Desarrollador'),
    ('Analista'),
    ('Soporte Técnico'),
    ('Gerente');

INSERT INTO Departamentos (nombre, carrera)
VALUES 
    ('Sistemas', 'Ingeniería en Sistemas Computacionales'),
    ('Ventas', 'Administración de Empresas'),
    ('Recursos Humanos', 'Psicología Organizacional'),
    ('Marketing', 'Mercadotecnia'),
    ('Contabilidad', 'Contaduría Pública');

INSERT INTO Usuarios (nombre, correo, rol, departamento)
VALUES 
    ('Carlos Pérez', 'carlos.perez@example.com', 1, 1),
    ('Ana García', 'ana.garcia@example.com', 2, 2),
    ('Luis Martínez', 'luis.martinez@example.com', 3, 3),
    ('Marta López', 'marta.lopez@example.com', 4, 4),
    ('José Fernández', 'jose.fernandez@example.com', 5, 5);

INSERT INTO Ubicacion (nombre, tipo, edificio, departamento)
VALUES 
    ('Aula 101', 'Aula', 'EB01', 1),
    ('Oficina 202', 'Oficina', 'EASA', 2),
    ('Sala de reuniones', 'Sala', 'EB01', 3),
    ('Oficina 303', 'Oficina', 'EB01', 4),
    ('Laboratorio 1', 'Laboratorio', 'EASA', 5);

INSERT INTO Configuraciones (estatus, ubicacion)
VALUES 
    ('Activo', 1),
    ('Inactivo', 2),
    ('En espera', 3),
    ('Activo', 4),
    ('Inactivo', 5);

INSERT INTO ConjuntoSoftware (software, configuracion)
VALUES 
    (1, 1),  -- Windows 10 en configuración 1
    (2, 2),  -- LibreOffice en configuración 2
    (3, 3),  -- Google Chrome en configuración 3
    (4, 4),  -- IntelliJ IDEA en configuración 4
    (5, 5);  -- Photoshop en configuración 5

INSERT INTO Hardware (nombre, fabricante, tipo, estatus, configuracion)
VALUES 
    ('CPU', 'Intel', 'Procesador', 'Activo', 1),
    ('Teclado', 'Logitech', 'Entrada', 'Activo', 2),
    ('Pantalla', 'Samsung', 'Monitor', 'Activo', 3),
    ('Impresora', 'HP', 'Periférico', 'Inactivo', 4),
    ('Mouse', 'Logitech', 'Entrada', 'Activo', 5);

INSERT INTO Especificaciones (tipo, valor)
VALUES 
    ('Velocidad', '3.4 GHz'),
    ('Memoria RAM', '16 GB'),
    ('Pantalla', '24 pulgadas'),
    ('Conectividad', 'Wi-Fi'),
    ('Resolución', '1920x1080');

INSERT INTO EspecificacionesHardware (hardware, especificacion)
VALUES 
    (1, 1),  -- CPU con velocidad de 3.4 GHz
    (2, 2),  -- Teclado con memoria RAM de 16 GB
    (3, 3),  -- Pantalla de 24 pulgadas
    (4, 4),  -- Impresora con conectividad Wi-Fi
    (5, 5);  -- Mouse con resolución 1920x1080

INSERT INTO EspecificacionesConfiguracion (configuracion, especificacion)
VALUES 
    (1, 1),  -- Configuración 1 con velocidad 3.4 GHz
    (2, 2),  -- Configuración 2 con memoria RAM de 16 GB
    (3, 3),  -- Configuración 3 con pantalla de 24 pulgadas
    (4, 4),  -- Configuración 4 con conectividad Wi-Fi
    (5, 5);  -- Configuración 5 con resolución 1920x1080

INSERT INTO BitacoraHardware (tipo, fecha, hardware)
VALUES 
    ('Ingreso', '2025-03-10 08:00:00', 1),
    ('Instalación', '2025-03-11 09:00:00', 2),
    ('Retiro', '2025-03-12 10:00:00', 3),
    ('Cambio', '2025-03-13 11:00:00', 4),
    ('Mantenimiento', '2025-03-14 12:00:00', 5);

INSERT INTO BitacoraConfiguracion (tipo, fecha, configuracion)
VALUES 
    ('Ingreso', '2025-03-10 08:00:00', 1),
    ('Instalación', '2025-03-11 09:00:00', 2),
    ('Retiro', '2025-03-12 10:00:00', 3),
    ('Cambio', '2025-03-13 11:00:00', 4),
    ('Mantenimiento', '2025-03-14 12:00:00', 5);

INSERT INTO BitacoraSoftware (tipo, fecha, configuracion, software)
VALUES 
    ('Instalación', '2025-03-10 08:00:00', 1, 1),
    ('Retiro', '2025-03-11 09:00:00', 2, 2),
    ('Cambio', '2025-03-12 10:00:00', 3, 3),
    ('Actualización', '2025-03-13 11:00:00', 4, 4),
    ('Desinstalación', '2025-03-14 12:00:00', 5, 5);
