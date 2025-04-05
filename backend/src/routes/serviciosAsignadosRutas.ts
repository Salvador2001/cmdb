import express, { Request, Response } from 'express';
import * as serviciosAsignadosServices from '../services/serviciosAsignadosServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let serviciosAsignados = await serviciosAsignadosServices.obtieneServiciosAsignados();
    res.send(serviciosAsignados);
});

router.get('/:servicio/:responsable', async (req: Request, res: Response) => {
    let servicioAsignado = await serviciosAsignadosServices.encuentraServicioAsignado(Number(req.params.servicio), Number(req.params.responsable));
    res.send(servicioAsignado);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { servicio, responsable } = req.body;
        const nuevo = await serviciosAsignadosServices.agregarServicioAsignado({ servicio, responsable });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el servicio asignado');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { servicio, responsable } = req.body;
        const modificado = await serviciosAsignadosServices.modificarServicioAsignado({ servicio, responsable });
        res.send(modificado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { servicio, responsable } = req.body;
        const eliminado = await serviciosAsignadosServices.borrarServicioAsignado(Number(servicio), Number(responsable));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;