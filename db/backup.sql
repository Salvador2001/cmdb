-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: cmdb
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BitacoraComponentes`
--

DROP TABLE IF EXISTS `BitacoraComponentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BitacoraComponentes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `operacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `componente` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `componente` (`componente`),
  CONSTRAINT `BitacoraComponentes_ibfk_1` FOREIGN KEY (`componente`) REFERENCES `Componentes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BitacoraComponentes`
--

LOCK TABLES `BitacoraComponentes` WRITE;
/*!40000 ALTER TABLE `BitacoraComponentes` DISABLE KEYS */;
INSERT INTO `BitacoraComponentes` VALUES (1,'Ingreso','2025-03-10 08:00:00',1),(2,'Instalación','2025-03-11 09:00:00',2),(3,'Retiro','2025-03-12 10:00:00',3),(4,'Cambio','2025-03-13 11:00:00',4),(5,'Mantenimiento','2025-03-14 12:00:00',5);
/*!40000 ALTER TABLE `BitacoraComponentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BitacoraConfiguraciones`
--

DROP TABLE IF EXISTS `BitacoraConfiguraciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BitacoraConfiguraciones` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `operacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `configuracion` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `configuracion` (`configuracion`),
  CONSTRAINT `BitacoraConfiguraciones_ibfk_1` FOREIGN KEY (`configuracion`) REFERENCES `Configuraciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BitacoraConfiguraciones`
--

LOCK TABLES `BitacoraConfiguraciones` WRITE;
/*!40000 ALTER TABLE `BitacoraConfiguraciones` DISABLE KEYS */;
INSERT INTO `BitacoraConfiguraciones` VALUES (1,'Ingreso','2025-03-10 08:00:00',1),(2,'Instalación','2025-03-11 09:00:00',2),(3,'Retiro','2025-03-12 10:00:00',3),(4,'Cambio','2025-03-13 11:00:00',4),(5,'Mantenimiento','2025-03-14 12:00:00',5);
/*!40000 ALTER TABLE `BitacoraConfiguraciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BitacoraIncidencias`
--

DROP TABLE IF EXISTS `BitacoraIncidencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BitacoraIncidencias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `operacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `incidencia` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `incidencia` (`incidencia`),
  CONSTRAINT `BitacoraIncidencias_ibfk_1` FOREIGN KEY (`incidencia`) REFERENCES `Incidencias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BitacoraIncidencias`
--

LOCK TABLES `BitacoraIncidencias` WRITE;
/*!40000 ALTER TABLE `BitacoraIncidencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `BitacoraIncidencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BitacoraSoftware`
--

DROP TABLE IF EXISTS `BitacoraSoftware`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BitacoraSoftware` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `operacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `configuracion` int unsigned NOT NULL,
  `software` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `software` (`software`),
  KEY `configuracion` (`configuracion`,`software`),
  CONSTRAINT `BitacoraSoftware_ibfk_1` FOREIGN KEY (`configuracion`) REFERENCES `Configuraciones` (`id`),
  CONSTRAINT `BitacoraSoftware_ibfk_2` FOREIGN KEY (`software`) REFERENCES `Software` (`id`),
  CONSTRAINT `BitacoraSoftware_ibfk_3` FOREIGN KEY (`configuracion`, `software`) REFERENCES `ConjuntoSoftware` (`configuracion`, `software`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BitacoraSoftware`
--

LOCK TABLES `BitacoraSoftware` WRITE;
/*!40000 ALTER TABLE `BitacoraSoftware` DISABLE KEYS */;
INSERT INTO `BitacoraSoftware` VALUES (1,'Instalación','2025-03-10 08:00:00',1,1),(2,'Retiro','2025-03-11 09:00:00',2,2),(3,'Cambio','2025-03-12 10:00:00',3,3),(4,'Actualización','2025-03-13 11:00:00',4,4),(5,'Desinstalación','2025-03-14 12:00:00',5,5);
/*!40000 ALTER TABLE `BitacoraSoftware` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BitacoraUsuarios`
--

DROP TABLE IF EXISTS `BitacoraUsuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BitacoraUsuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `operacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `usuario` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario` (`usuario`),
  CONSTRAINT `BitacoraUsuarios_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BitacoraUsuarios`
--

LOCK TABLES `BitacoraUsuarios` WRITE;
/*!40000 ALTER TABLE `BitacoraUsuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `BitacoraUsuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Componentes`
--

DROP TABLE IF EXISTS `Componentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Componentes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fabricante` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estatus` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `configuracion` int unsigned DEFAULT NULL,
  `rfc` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `configuracion` (`configuracion`),
  KEY `rfc` (`rfc`),
  CONSTRAINT `Componentes_ibfk_1` FOREIGN KEY (`configuracion`) REFERENCES `Configuraciones` (`id`),
  CONSTRAINT `Componentes_ibfk_2` FOREIGN KEY (`rfc`) REFERENCES `SolicitudesCambio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Componentes`
--

LOCK TABLES `Componentes` WRITE;
/*!40000 ALTER TABLE `Componentes` DISABLE KEYS */;
INSERT INTO `Componentes` VALUES (1,'CPU','Intel','Procesador','Activo',3,NULL),(2,'Memoria RAM','Kingston','Memoria','Activo',3,NULL),(3,'Disco Duro','Seagate','Almacenamiento','Activo',3,NULL),(4,'Tarjeta Madre','ASUS','Placa Base','Activo',3,NULL),(5,'Fuente de Poder','Corsair','Fuente','Activo',3,NULL);
/*!40000 ALTER TABLE `Componentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Configuraciones`
--

DROP TABLE IF EXISTS `Configuraciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Configuraciones` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fabricante` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estatus` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ubicacion` int unsigned DEFAULT NULL,
  `serial` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_compra` datetime DEFAULT NULL,
  `rfc` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serial` (`serial`),
  KEY `ubicacion` (`ubicacion`),
  KEY `rfc` (`rfc`),
  CONSTRAINT `Configuraciones_ibfk_1` FOREIGN KEY (`ubicacion`) REFERENCES `Ubicacion` (`id`),
  CONSTRAINT `Configuraciones_ibfk_2` FOREIGN KEY (`rfc`) REFERENCES `SolicitudesCambio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Configuraciones`
--

LOCK TABLES `Configuraciones` WRITE;
/*!40000 ALTER TABLE `Configuraciones` DISABLE KEYS */;
INSERT INTO `Configuraciones` VALUES (1,'Monitor Dell','Dell','Monitor','Activo',2,'MNT-2025-DEF456','2025-04-02 00:00:00',NULL),(2,'Laptop HP','HP','Laptop','Activo',2,'LPT-2025-ABC123','2025-04-10 00:00:00',NULL),(3,'PC Lenovo','Lenovo','Desktop','Inactivo',3,NULL,'2025-04-02 00:00:00',NULL),(4,'Servidor IBM','IBM','Servidor','En espera',4,NULL,'2025-04-08 00:00:00',NULL),(5,'Laptop Asus','Asus','Laptop','Activo',5,NULL,'2025-03-31 00:00:00',NULL),(10,'Laptop acer','acer','laptop','activo',1,'LPT-2025-XYZ789','2025-04-22 00:00:00',NULL);
/*!40000 ALTER TABLE `Configuraciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ConjuntoSoftware`
--

DROP TABLE IF EXISTS `ConjuntoSoftware`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ConjuntoSoftware` (
  `software` int unsigned NOT NULL,
  `configuracion` int unsigned NOT NULL,
  PRIMARY KEY (`configuracion`,`software`),
  KEY `software` (`software`),
  CONSTRAINT `ConjuntoSoftware_ibfk_1` FOREIGN KEY (`software`) REFERENCES `Software` (`id`),
  CONSTRAINT `ConjuntoSoftware_ibfk_2` FOREIGN KEY (`configuracion`) REFERENCES `Configuraciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ConjuntoSoftware`
--

LOCK TABLES `ConjuntoSoftware` WRITE;
/*!40000 ALTER TABLE `ConjuntoSoftware` DISABLE KEYS */;
INSERT INTO `ConjuntoSoftware` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);
/*!40000 ALTER TABLE `ConjuntoSoftware` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Credenciales`
--

DROP TABLE IF EXISTS `Credenciales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Credenciales` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `correo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contrasenia` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `usuario` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`),
  KEY `usuario` (`usuario`),
  CONSTRAINT `Credenciales_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Credenciales`
--

LOCK TABLES `Credenciales` WRITE;
/*!40000 ALTER TABLE `Credenciales` DISABLE KEYS */;
INSERT INTO `Credenciales` VALUES (1,'carlos.perez@example.com','asd',1),(2,'ana.garcia@example.com','dsa',2),(3,'luis.martinez@example.com','admin',3),(4,'marta.lopez@example.com','pepito',4),(5,'jose.fernandez@example.com','HSzldj427cmnsjakllo9',5),(6,'asdasdasdasda@hotmail.com','asdasdasd',17),(7,'testing9@test.com','abcd',18),(8,'testing10@test.com','abcdefg',19),(9,'ejemplo1@gmail.com','1234',20);
/*!40000 ALTER TABLE `Credenciales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Departamentos`
--

DROP TABLE IF EXISTS `Departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Departamentos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `carrera` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Departamentos`
--

LOCK TABLES `Departamentos` WRITE;
/*!40000 ALTER TABLE `Departamentos` DISABLE KEYS */;
INSERT INTO `Departamentos` VALUES (1,'Sistemas','Ingeniería en Sistemas Computacionales'),(2,'Mecatrónica','Ingeniería en mecatrónica'),(3,'Centro de cómputo','Ingeniería en Sistemas Computacionales'),(4,'Bioquímica','Ingeniería en Bioquímica'),(5,'Mecánica','Ingeniería Mecánica');
/*!40000 ALTER TABLE `Departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Especificaciones`
--

DROP TABLE IF EXISTS `Especificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Especificaciones` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `valor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Especificaciones`
--

LOCK TABLES `Especificaciones` WRITE;
/*!40000 ALTER TABLE `Especificaciones` DISABLE KEYS */;
INSERT INTO `Especificaciones` VALUES (1,'Velocidad','3.4 GHz'),(2,'Capacidad','16 GB'),(3,'Pantalla','24 pulgadas'),(4,'Conectividad','Wi-Fi'),(5,'Resolución','1920x1080');
/*!40000 ALTER TABLE `Especificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EspecificacionesComponente`
--

DROP TABLE IF EXISTS `EspecificacionesComponente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EspecificacionesComponente` (
  `componente` int unsigned NOT NULL,
  `especificacion` int unsigned NOT NULL,
  PRIMARY KEY (`componente`,`especificacion`),
  KEY `especificacion` (`especificacion`),
  CONSTRAINT `EspecificacionesComponente_ibfk_1` FOREIGN KEY (`componente`) REFERENCES `Componentes` (`id`),
  CONSTRAINT `EspecificacionesComponente_ibfk_2` FOREIGN KEY (`especificacion`) REFERENCES `Especificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EspecificacionesComponente`
--

LOCK TABLES `EspecificacionesComponente` WRITE;
/*!40000 ALTER TABLE `EspecificacionesComponente` DISABLE KEYS */;
INSERT INTO `EspecificacionesComponente` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);
/*!40000 ALTER TABLE `EspecificacionesComponente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EspecificacionesConfiguracion`
--

DROP TABLE IF EXISTS `EspecificacionesConfiguracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EspecificacionesConfiguracion` (
  `configuracion` int unsigned NOT NULL,
  `especificacion` int unsigned NOT NULL,
  PRIMARY KEY (`configuracion`,`especificacion`),
  KEY `especificacion` (`especificacion`),
  CONSTRAINT `EspecificacionesConfiguracion_ibfk_1` FOREIGN KEY (`configuracion`) REFERENCES `Configuraciones` (`id`),
  CONSTRAINT `EspecificacionesConfiguracion_ibfk_2` FOREIGN KEY (`especificacion`) REFERENCES `Especificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EspecificacionesConfiguracion`
--

LOCK TABLES `EspecificacionesConfiguracion` WRITE;
/*!40000 ALTER TABLE `EspecificacionesConfiguracion` DISABLE KEYS */;
INSERT INTO `EspecificacionesConfiguracion` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);
/*!40000 ALTER TABLE `EspecificacionesConfiguracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Evaluaciones`
--

DROP TABLE IF EXISTS `Evaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Evaluaciones` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `puntuacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `comentario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `evaluador` int unsigned NOT NULL,
  `servicio` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `evaluador` (`evaluador`),
  KEY `servicio` (`servicio`),
  CONSTRAINT `Evaluaciones_ibfk_1` FOREIGN KEY (`evaluador`) REFERENCES `Usuarios` (`id`),
  CONSTRAINT `Evaluaciones_ibfk_2` FOREIGN KEY (`servicio`) REFERENCES `Servicios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Evaluaciones`
--

LOCK TABLES `Evaluaciones` WRITE;
/*!40000 ALTER TABLE `Evaluaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `Evaluaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Incidencias`
--

DROP TABLE IF EXISTS `Incidencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Incidencias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `folio` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `categoria` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `prioridad` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estatus` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `autor` int unsigned NOT NULL,
  `configuracion` int unsigned NOT NULL,
  `departamento` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `folio` (`folio`),
  KEY `autor` (`autor`),
  KEY `configuracion` (`configuracion`),
  KEY `departamento` (`departamento`),
  CONSTRAINT `Incidencias_ibfk_1` FOREIGN KEY (`autor`) REFERENCES `Usuarios` (`id`),
  CONSTRAINT `Incidencias_ibfk_2` FOREIGN KEY (`configuracion`) REFERENCES `Configuraciones` (`id`),
  CONSTRAINT `Incidencias_ibfk_3` FOREIGN KEY (`departamento`) REFERENCES `Departamentos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Incidencias`
--

LOCK TABLES `Incidencias` WRITE;
/*!40000 ALTER TABLE `Incidencias` DISABLE KEYS */;
INSERT INTO `Incidencias` VALUES (1,'INC001','Error en el sistema operativo','Software','Alta','Abierta','2023-10-01 10:00:00',1,1,1),(2,'INC002','Fallo en el hardware','Hardware','Media','En Proceso','2023-10-02 11:30:00',2,2,2),(3,'INC003','Problema de red en oficina','Red','Alta','Terminada','2023-10-03 09:15:00',3,3,3),(4,'INC004','Actualización de software pendiente','Software','Baja','Liberada','2023-10-04 14:45:00',4,4,4),(5,'INC005','Impresora no responde','Hardware','Media','Rechazada','2023-10-05 08:20:00',5,5,5),(19,'Test2381','Problema con la pantalla, no se muestra','Hardware','N/A','Abierta','2025-04-09 13:48:00',1,1,1),(20,'Test0202','Virus','Software','Alta','En Proceso','2025-04-10 03:17:00',1,10,1),(21,'Test003','Pantalla rota','Hardware','N/A','Abierta','2025-04-10 03:23:00',1,1,1),(22,'Test004','asdasdadasd','Otros','Baja','Rechazada','2025-04-10 03:28:00',1,4,1),(23,'Prua123','Pantalla parpadea mucho','Hardware','Media','En Proceso','2025-04-10 17:37:00',2,1,2);
/*!40000 ALTER TABLE `Incidencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,'Administrador'),(2,'Jefe departamento'),(3,'Soporte técnico'),(4,'Usuario'),(5,'Docente');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Servicios`
--

DROP TABLE IF EXISTS `Servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Servicios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `incidencia` int unsigned NOT NULL,
  `responsable` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `incidencia` (`incidencia`),
  KEY `responsable` (`responsable`),
  CONSTRAINT `Servicios_ibfk_1` FOREIGN KEY (`incidencia`) REFERENCES `Incidencias` (`id`),
  CONSTRAINT `Servicios_ibfk_2` FOREIGN KEY (`responsable`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Servicios`
--

LOCK TABLES `Servicios` WRITE;
/*!40000 ALTER TABLE `Servicios` DISABLE KEYS */;
INSERT INTO `Servicios` VALUES (1,'Hardware',19,NULL),(2,'Software',20,3),(3,'Hardware',21,NULL),(4,'Otros',22,3),(5,'Hardware',23,3);
/*!40000 ALTER TABLE `Servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiciosAsignados`
--

DROP TABLE IF EXISTS `ServiciosAsignados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ServiciosAsignados` (
  `servicio` int unsigned NOT NULL,
  `responsable` int unsigned NOT NULL,
  KEY `servicio` (`servicio`),
  KEY `responsable` (`responsable`),
  CONSTRAINT `ServiciosAsignados_ibfk_1` FOREIGN KEY (`servicio`) REFERENCES `Servicios` (`id`),
  CONSTRAINT `ServiciosAsignados_ibfk_2` FOREIGN KEY (`responsable`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiciosAsignados`
--

LOCK TABLES `ServiciosAsignados` WRITE;
/*!40000 ALTER TABLE `ServiciosAsignados` DISABLE KEYS */;
/*!40000 ALTER TABLE `ServiciosAsignados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Software`
--

DROP TABLE IF EXISTS `Software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Software` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `desarrollador` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `licencia` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `version` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Software`
--

LOCK TABLES `Software` WRITE;
/*!40000 ALTER TABLE `Software` DISABLE KEYS */;
INSERT INTO `Software` VALUES (1,'Windows 10','Microsoft','SO','OEM','10.0','Sistema operativo de escritorio de Microsoft.'),(2,'LibreOffice','The Document Foundation','Hojas de texto','GPL','7.3','Suite ofimática gratuita y de código abierto.'),(3,'Google Chrome','Google','Navegador','Freeware','96.0.4664.110','Navegador web rápido y seguro.'),(4,'IntelliJ IDEA','JetBrains','IDE','Commercial','2021.1','Entorno de desarrollo para Java y otros lenguajes.'),(5,'Photoshop','Adobe','Edición de imágenes','Licencia propietaria','2021.2','Software profesional de edición de imágenes.');
/*!40000 ALTER TABLE `Software` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SolicitudesCambio`
--

DROP TABLE IF EXISTS `SolicitudesCambio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SolicitudesCambio` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `estatus` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `requiere_comite` tinyint(1) DEFAULT '0',
  `servicio` int unsigned NOT NULL,
  `folio` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `folio` (`folio`),
  KEY `servicio` (`servicio`),
  CONSTRAINT `SolicitudesCambio_ibfk_1` FOREIGN KEY (`servicio`) REFERENCES `Servicios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SolicitudesCambio`
--

LOCK TABLES `SolicitudesCambio` WRITE;
/*!40000 ALTER TABLE `SolicitudesCambio` DISABLE KEYS */;
/*!40000 ALTER TABLE `SolicitudesCambio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ubicacion`
--

DROP TABLE IF EXISTS `Ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ubicacion` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `edificio` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `departamento` int unsigned NOT NULL,
  `responsable` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `departamento` (`departamento`),
  CONSTRAINT `Ubicacion_ibfk_1` FOREIGN KEY (`departamento`) REFERENCES `Departamentos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ubicacion`
--

LOCK TABLES `Ubicacion` WRITE;
/*!40000 ALTER TABLE `Ubicacion` DISABLE KEYS */;
INSERT INTO `Ubicacion` VALUES (1,'EB01','Aula','B',1,NULL),(2,'Depto. Mecatrónica','Oficina','P',2,NULL),(3,'LP','Aula','CC',3,NULL),(4,'Aula chata','Aula','D',4,NULL),(5,'Lab. Mecánica','Laboratorio','N',5,NULL);
/*!40000 ALTER TABLE `Ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `rol` int unsigned NOT NULL,
  `departamento` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rol` (`rol`),
  KEY `departamento` (`departamento`),
  CONSTRAINT `Usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `Roles` (`id`),
  CONSTRAINT `Usuarios_ibfk_2` FOREIGN KEY (`departamento`) REFERENCES `Departamentos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (1,'Carlos Pérez',1,1),(2,'Ana García',2,2),(3,'Luis Martínez',3,3),(4,'Marta López',4,4),(5,'José Fernández',5,5),(9,'testing1',1,1),(10,'testing2',1,1),(11,'testing3',1,1),(12,'testing4',1,1),(13,'testing5',1,1),(14,'testing6',1,1),(15,'testing7',1,1),(16,'testing8',1,1),(17,'aaaaaaaa',1,1),(18,'testing9',1,1),(19,'testing10',2,2),(20,'salvador',2,1);
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-10 20:24:24
