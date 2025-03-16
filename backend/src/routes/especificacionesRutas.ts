import express, { Request, Response } from 'express';
import * as especificacionesServices from '../services/especificacionesServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let especificaciones = await especificacionesServices.obtieneEspecificaciones();
    res.send(especificaciones);
});

router.get('/:id', async (req: Request, res: Response) => {
    let especificacion = await especificacionesServices.encuentraEspecificacion(Number(req.params.id));
    res.send(especificacion);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { tipo, valor } = req.body;
        const nueva = await especificacionesServices.agregarEspecificacion({ tipo, valor });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la especificación');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, tipo, valor } = req.body;
        const modificada = await especificacionesServices.modificarEspecificacion({ id, tipo, valor });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminada = await especificacionesServices.borrarEspecificacion(Number(id));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;