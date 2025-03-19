import express from 'express';
import cors from 'cors';

//  Creamos la aplicación a través del paquete express
//  y llamamos a su constructor
const app = express();

//  Configurar rutas para el acceso personal
import personalRutas from './routes/personalRutas';
import especificacionesConfiguracionRutas from './routes/especificacionesConfiguracionRutas';
import componentesRutas from './routes/componentesRutas';
import usuariosRutas from './routes/usuariosRutas';
import conjuntoSoftwareRutas from './routes/conjuntoSoftwareRutas';
import softwareRutas from './routes/softwareRutas';
import bitacoraComponentesRutas from './routes/bitacoraComponentesRutas';
import bitacoraConfiguracionesRutas from './routes/bitacoraConfiguracionesRutas';
import especificacionesComponenteRutas from './routes/especificacionesComponenteRutas';
import ubicacionRutas from './routes/ubicacionRutas';
import bitacoraSoftwareRutas from './routes/bitacoraSoftwareRutas';
import configuracionesRutas from './routes/configuracionesRutas';
import rolesRutas from './routes/rolesRutas';
import departamentosRutas from './routes/departamentosRutas';
import especificacionesRutas from './routes/especificacionesRutas';

//  Todo lo que regresa al usuario es tipo JSON
app.use(express.json());

//  Usar cors para que el backend pueda ser consumido por el frontend
app.use(cors());

//  Puerto para escuchar la petición del frontend
const PUERTO = 3001;

//  Activar las rutas base
app.use('/api/personal', personalRutas);
app.use('/api/especificaciones-configuracion', especificacionesConfiguracionRutas);
app.use('/api/componentes', componentesRutas);
app.use('/api/usuarios', usuariosRutas);
app.use('/api/conjunto-software', conjuntoSoftwareRutas);
app.use('/api/software', softwareRutas);
app.use('/api/bitacora-componentes', bitacoraComponentesRutas);
app.use('/api/bitacora-configuraciones', bitacoraConfiguracionesRutas);
app.use('/api/especificaciones-componente', especificacionesComponenteRutas);
app.use('/api/ubicacion', ubicacionRutas);
app.use('/api/bitacora-software', bitacoraSoftwareRutas);
app.use('/api/configuraciones', configuracionesRutas);
app.use('/api/roles', rolesRutas);
app.use('/api/departamentos', departamentosRutas);
app.use('/api/especificaciones', especificacionesRutas);

//  Ruta
//  guión bajo ignora el parámetro, para que no sea obligatorio
// app.get('/hola',(_req,res) =>{ //  request,response
//     let fecha = new Date().toLocaleDateString();
//     res.send('mundo con la fecha '+fecha+" con TypeScript");
// })

//  Encendemos el servidor y lo ponemos en escucha
app.listen(PUERTO, () =>{
    console.log(`Servidor en ejecución y escuchando en el puerto ${PUERTO}`);
})