import express, { Request, Response } from 'express';
import * as serviciosServices from '../services/serviciosServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let servicios = await serviciosServices.obtieneServicios();
    res.send(servicios);
});

router.get('/:id', async (req: Request, res: Response) => {
    let servicio = await serviciosServices.encuentraServicio(Number(req.params.id));
    res.send(servicio);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { tipo, incidencia } = req.body;
        const nuevo = await serviciosServices.agregarServicio({ tipo, incidencia });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el servicio');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, tipo, incidencia } = req.body;
        const modificado = await serviciosServices.modificarServicio({ id, tipo, incidencia });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await serviciosServices.borrarServicio(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;