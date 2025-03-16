import express, { Request, Response } from 'express';
import * as especificacionesConfiguracionServices from '../services/especificacionesConfiguracionServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let especificacionesConfiguracion = await especificacionesConfiguracionServices.obtieneEspecificacionesConfiguracion();
    res.send(especificacionesConfiguracion);
});

router.get('/:configuracion/:especificacion', async (req: Request, res: Response) => {
    let especificacionConfiguracion = await especificacionesConfiguracionServices.encuentraEspecificacionConfiguracion(Number(req.params.configuracion), Number(req.params.especificacion));
    res.send(especificacionConfiguracion);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { configuracion, especificacion } = req.body;
        const nueva = await especificacionesConfiguracionServices.agregarEspecificacionConfiguracion({
            configuracion,
            especificacion
        });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la especificación de configuración');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { configuracion, especificacion } = req.body;
        const modificada = await especificacionesConfiguracionServices.modificarEspecificacionConfiguracion({
            configuracion,
            especificacion
        });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { configuracion, especificacion } = req.body;
        const eliminada = await especificacionesConfiguracionServices.borrarEspecificacionConfiguracion(Number(configuracion), Number(especificacion));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;