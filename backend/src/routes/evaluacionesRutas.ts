import express, { Request, Response } from 'express';
import * as evaluacionesServices from '../services/evaluacionesServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let evaluaciones = await evaluacionesServices.obtieneEvaluaciones();
    res.send(evaluaciones);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { fecha, puntuacion, comentario, evaluador, servicio } = req.body;
        const nueva = await evaluacionesServices.agregarEvaluacion({ fecha, puntuacion, comentario, evaluador, servicio });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la evaluación');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, fecha, puntuacion, comentario, evaluador, servicio } = req.body;
        const modificada = await evaluacionesServices.modificarEvaluacion({ id, fecha, puntuacion, comentario, evaluador, servicio });
        res.send(modificada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await evaluacionesServices.borrarEvaluacion(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;