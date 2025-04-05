import express, { Request, Response } from 'express';
import * as bitacoraIncidenciasServices from '../services/bitacoraIncidenciasServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let bitacora = await bitacoraIncidenciasServices.obtieneBitacoraIncidencias();
    res.send(bitacora);
});

router.get('/:id', async (req: Request, res: Response) => {
    let bitacora = await bitacoraIncidenciasServices.encuentraBitacoraIncidencia(Number(req.params.id));
    res.send(bitacora);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { fecha, operacion, incidencia } = req.body;
        const nueva = await bitacoraIncidenciasServices.agregarBitacoraIncidencia({ fecha, operacion, incidencia });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la bitácora de incidencia');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, fecha, operacion, incidencia } = req.body;
        const modificada = await bitacoraIncidenciasServices.modificarBitacoraIncidencia({ id, fecha, operacion, incidencia });
        res.send(modificada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await bitacoraIncidenciasServices.borrarBitacoraIncidencia(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;