import express, { Request, Response } from 'express';
import * as incidenciasServices from '../services/incidenciasServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let incidencias = await incidenciasServices.obtieneIncidencias();
    res.send(incidencias);
});

router.get('/departamento/:id', async (req: Request, res: Response) => {
    let incidencias = await incidenciasServices.obtieneIncidenciasPorDepartamento(Number(req.params.id));
    res.send(incidencias);
});

router.get('/:id', async (req: Request, res: Response) => {
    let incidencia = await incidenciasServices.encuentraIncidencia(Number(req.params.id));
    res.send(incidencia);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { folio, descripcion, categoria, prioridad, estatus, fecha_creacion, fecha_resolucion, autor, configuracion, departamento } = req.body;
        const nueva = await incidenciasServices.agregarIncidencia({ folio, descripcion, categoria, prioridad, estatus, fecha_creacion, fecha_resolucion, autor, configuracion, departamento });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la incidencia');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, folio, descripcion, categoria, prioridad, estatus, fecha_creacion, fecha_resolucion, autor, configuracion, departamento } = req.body;
        const modificada = await incidenciasServices.modificarIncidencia({ id, folio, descripcion, categoria, prioridad, estatus, fecha_creacion, fecha_resolucion, autor, configuracion, departamento });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminada = await incidenciasServices.borrarIncidencia(Number(id));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;