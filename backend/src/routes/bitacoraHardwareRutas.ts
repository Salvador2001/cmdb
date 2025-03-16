import express, { Request, Response } from 'express';
import * as bitacoraHardwareServices from '../services/bitacoraHardwareServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let bitacoraHardware = await bitacoraHardwareServices.obtieneBitacoraHardware();
    res.send(bitacoraHardware);
});

router.get('/:id', async (req: Request, res: Response) => {
    let bitacoraHardware = await bitacoraHardwareServices.encuentraBitacoraHardware(Number(req.params.id));
    res.send(bitacoraHardware);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { tipo, fecha, hardware } = req.body;
        const nueva = await bitacoraHardwareServices.agregarBitacoraHardware({
            tipo,
            fecha,
            hardware
        });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la bitácora de hardware');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, tipo, fecha, hardware } = req.body;
        const modificada = await bitacoraHardwareServices.modificarBitacoraHardware({
            id,
            tipo,
            fecha,
            hardware
        });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminada = await bitacoraHardwareServices.borrarBitacoraHardware(Number(id));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;