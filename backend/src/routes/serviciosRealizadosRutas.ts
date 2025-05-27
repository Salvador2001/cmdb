import express, { Request, Response } from 'express';
import * as serviciosRealizadosServices from '../services/serviciosRealizadosServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let servicios = await serviciosRealizadosServices.obtenerServiciosRealizados();
    res.send(servicios);
});

router.get('/:id', async (req: Request, res: Response) => {
    let listaServiciosRealizados = await serviciosRealizadosServices.obtenerServiciosRealizadosId(Number(req.params.id));
    res.send(listaServiciosRealizados);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { servicio_asignado, servicio_realizado } = req.body;
        const nuevo = await serviciosRealizadosServices.agregarServicioRealizado(servicio_asignado, servicio_realizado);
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el servicio realizado');
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { servicio_asignado, servicio_realizado } = req.body;
        const eliminado = await serviciosRealizadosServices.borrarServicioRealizado(servicio_asignado, servicio_realizado);
        res.send(eliminado);
    } catch (err) {
        res.status(400).send('Error en los datos');
    }
});

export default router;