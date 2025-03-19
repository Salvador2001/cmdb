import express, { Request, Response } from 'express';
import * as especificacionesComponenteServices from '../services/especificacionesComponenteServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let especificacionesComponente = await especificacionesComponenteServices.obtieneEspecificacionesComponente();
    res.send(especificacionesComponente);
});

router.get('/:componente/:especificacion', async (req: Request, res: Response) => {
    let especificacionComponente = await especificacionesComponenteServices.encuentraEspecificacionComponente(Number(req.params.componente), Number(req.params.especificacion));
    res.send(especificacionComponente);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { componente, especificacion } = req.body;
        const nueva = await especificacionesComponenteServices.agregarEspecificacionComponente({ componente, especificacion });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la especificación de componente');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { componente, especificacion } = req.body;
        const modificada = await especificacionesComponenteServices.modificarEspecificacionComponente({ componente, especificacion });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { componente, especificacion } = req.body;
        const eliminada = await especificacionesComponenteServices.borrarEspecificacionComponente(Number(componente), Number(especificacion));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;