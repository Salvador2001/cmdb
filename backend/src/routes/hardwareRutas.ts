import express, { Request, Response } from 'express';
import * as hardwareServices from '../services/hardwareServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let hardware = await hardwareServices.obtieneHardware();
    res.send(hardware);
});

router.get('/:id', async (req: Request, res: Response) => {
    let hardware = await hardwareServices.encuentraHardware(Number(req.params.id));
    res.send(hardware);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, fabricante, tipo, estatus, configuracion } = req.body;
        const nuevo = await hardwareServices.agregarHardware({ nombre, fabricante, tipo, estatus, configuracion });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el hardware');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, nombre, fabricante, tipo, estatus, configuracion } = req.body;
        const modificado = await hardwareServices.modificarHardware({ id, nombre, fabricante, tipo, estatus, configuracion });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await hardwareServices.borrarHardware(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;