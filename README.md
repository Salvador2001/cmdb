# cmdb
Prototipo de gestor de incidencias centrado en el ITC

Para correr la imagen de mysql en docker:
`docker run -d -p 3306:3306 --name mysql-db -e MYSQL_ROOT_PASSWORD=prueba123 mysql`

* -d: Deatached Mode es la forma en que indicamos que corra en background.
* -p : puerto, el contenedor corre en el puerto 3306 pero hacemos un bind para que lo escuchemos en Host el puerto 33061.
* –name : para no tener que hacer referencia al hash le asignamos un nombre.
* -e : environment le asignamos la contraseña.

Para conectarse al contenedor en modo interactivo:
`docker exec -it mysql-db mysql -p`

* exec: indicamos que vamos a pasar un comando.
* -it Modo interactivo.
* mysql -p: es el comando para entrar a la consola de mysql con el usuario root(si has trabajado con mysql en consola es lo mismo).