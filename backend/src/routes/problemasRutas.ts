import express, { Request, Response } from 'express';
import * as problemasServices from '../services/problemasServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let problemas = await problemasServices.obtieneProblemas();
    res.send(problemas);
});

router.get('/:id', async (req: Request, res: Response) => {
    let problema = await problemasServices.encuentraProblema(Number(req.params.id));
    res.send(problema);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { folio, error_conocido, causa_raiz, solucion, estatus, fecha_creacion, fecha_resolucion, autor, departamento, responsable } = req.body;
        const nuevo = await problemasServices.agregarProblema({ folio, error_conocido, causa_raiz, solucion, estatus, fecha_creacion, fecha_resolucion, autor, departamento, responsable });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el problema');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, folio, error_conocido, causa_raiz, solucion, estatus, fecha_creacion, fecha_resolucion, autor, departamento, responsable } = req.body;
        const modificada = await problemasServices.editarProblema({ id, folio, error_conocido, causa_raiz, solucion, estatus, fecha_creacion, fecha_resolucion, autor, departamento, responsable });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminada = await problemasServices.borrarProblema(Number(id));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;