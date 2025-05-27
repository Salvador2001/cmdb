import express, { Request, Response } from 'express';
import * as incidenciasProblemaServices from '../services/incidenciasProblemaServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let relaciones = await incidenciasProblemaServices.obtieneIncidenciasProblema();
    res.send(relaciones);
});

router.get('/:problema', async (req: Request, res: Response) => {
    let relacion = await incidenciasProblemaServices.encuentraIncidenciasProblema( Number(req.params.problema));
    res.send(relacion);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { incidencia, problema } = req.body;
        const nueva = await incidenciasProblemaServices.agregarIncidenciaProblema({ incidencia, problema });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la relación incidencia-problema');
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { incidencia, problema } = req.body;
        const eliminada = await incidenciasProblemaServices.borrarIncidenciaProblema(Number(incidencia), Number(problema));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;