CREATE DATABASE cmdb;
USE cmdb;

CREATE TABLE Software(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8mb4,
    desarrollador VARCHAR(100) CHARACTER SET utf8mb4,
    tipo VARCHAR(50) CHARACTER SET utf8mb4, -- SO, hojas de texto, IDE, navegador, etc.
    licencia VARCHAR(50) CHARACTER SET utf8mb4,
    version VARCHAR(50) CHARACTER SET utf8mb4, -- hay software que maneja versiones no solo con números
    descripcion TEXT CHARACTER SET utf8mb4 -- otros detalles que podrían ser relevantes.
);

CREATE TABLE Roles(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8mb4
);

CREATE TABLE Departamentos(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8mb4,
    carrera VARCHAR(100) CHARACTER SET utf8mb4
);

CREATE TABLE Usuarios(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8mb4,
    correo VARCHAR(100) CHARACTER SET utf8mb4 UNIQUE NOT NULL,
    rol INT UNSIGNED NOT NULL,
    departamento INT UNSIGNED NOT NULL,
    FOREIGN KEY (rol) REFERENCES Roles(id),
    FOREIGN KEY (departamento) REFERENCES Departamentos(id)
);

CREATE TABLE Ubicacion(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8mb4,
    tipo VARCHAR(50) CHARACTER SET utf8mb4, -- aula, oficina, etc.
    edificio VARCHAR(10) CHARACTER SET utf8mb4, -- EASA, EB01, etc.
    departamento INT UNSIGNED NOT NULL,
    FOREIGN KEY (departamento) REFERENCES Departamentos(id)
);

CREATE TABLE Configuraciones(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    estatus VARCHAR(50) CHARACTER SET utf8mb4, -- activo, inactivo, en espera, etc.
    ubicacion INT UNSIGNED,
    -- registro? desde el lado de incidencias, ya sería instalación, cambio software, etc.
    -- incidencia <- no implementado.
    FOREIGN KEY (ubicacion) REFERENCES Ubicacion(id)
);

CREATE TABLE ConjuntoSoftware( -- Software instalado en una configuración
    software INT UNSIGNED,
    configuracion INT UNSIGNED,
    FOREIGN KEY (software) REFERENCES Software(id),
    FOREIGN KEY (configuracion) REFERENCES Configuraciones(id),
    PRIMARY KEY (configuracion, software)
);

CREATE TABLE Hardware( -- componentes
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8mb4,
    fabricante VARCHAR(100) CHARACTER SET utf8mb4,
    tipo VARCHAR(50) CHARACTER SET utf8mb4,
    estatus VARCHAR(50) CHARACTER SET utf8mb4, -- activo, inactivo, almacenado, retirado etc.
    /*hardware_padre INT UNSIGNED DEFAULT NULL, -- existe hardware que no son componentes de otros.*/
    configuracion INT UNSIGNED DEFAULT NULL, -- cierto hardware podría no estar en una configuración existente, como los almacenados o retirados.
    /*FOREIGN KEY (hardware_padre) REFERENCES Hardware(id),*/
    FOREIGN KEY (configuracion) REFERENCES Configuraciones(id)
);

CREATE TABLE Especificaciones(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) CHARACTER SET utf8mb4,
    valor VARCHAR(50) CHARACTER SET utf8mb4
);

CREATE TABLE EspecificacionesHardware( -- lista de especificaciones que tiene un componente
    hardware INT UNSIGNED NOT NULL,
    especificacion INT UNSIGNED NOT NULL,
    FOREIGN KEY (hardware) REFERENCES Hardware(id),
    FOREIGN KEY (especificacion) REFERENCES Especificaciones(id),
    PRIMARY KEY (hardware, especificacion)
);

CREATE TABLE EspecificacionesConfiguracion(
    configuracion INT UNSIGNED NOT NULL,
    especificacion INT UNSIGNED NOT NULL,
    FOREIGN KEY (configuracion) REFERENCES Configuraciones(id),
    FOREIGN KEY (especificacion) REFERENCES Especificaciones(id),
    PRIMARY KEY (configuracion, especificacion)
);

CREATE TABLE BitacoraHardware( -- Cambios que se hayan hecho a componentes
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) CHARACTER SET utf8mb4, -- ingreso, instalación, retiro, etc.
    fecha DATETIME,
    hardware INT UNSIGNED NOT NULL,
    FOREIGN KEY (hardware) REFERENCES Hardware(id)
);

CREATE TABLE BitacoraConfiguracion( -- Cambios que se hayan hecho a elementos de configuración
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) CHARACTER SET utf8mb4, -- ingreso, instalación, retiro, etc.
    fecha DATETIME,
    configuracion INT UNSIGNED NOT NULL,
    FOREIGN KEY (configuracion) REFERENCES Configuraciones(id)
);

CREATE TABLE BitacoraSoftware( -- Cambios que se hayan hecho a software de una configuración
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) CHARACTER SET utf8mb4, -- instalación, retiro, etc.
    fecha DATETIME,
    configuracion INT UNSIGNED NOT NULL,
    software INT UNSIGNED NOT NULL,
    FOREIGN KEY (configuracion) REFERENCES Configuraciones(id),
    FOREIGN KEY (software) REFERENCES Software(id),
    FOREIGN KEY (configuracion, software) REFERENCES ConjuntoSoftware(configuracion, software)
);