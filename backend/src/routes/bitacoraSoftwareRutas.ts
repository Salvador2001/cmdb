import express, { Request, Response } from 'express';
import * as bitacoraSoftwareServices from '../services/bitacoraSoftwareServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let bitacoraSoftware = await bitacoraSoftwareServices.obtieneBitacoraSoftware();
    res.send(bitacoraSoftware);
});

router.get('/:id', async (req: Request, res: Response) => {
    let bitacoraSoftware = await bitacoraSoftwareServices.encuentraBitacoraSoftware(Number(req.params.id));
    res.send(bitacoraSoftware);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { tipo, fecha, configuracion, software } = req.body;
        const nueva = await bitacoraSoftwareServices.agregarBitacoraSoftware({
            tipo,
            fecha,
            configuracion,
            software
        });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la bitácora de software');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, tipo, fecha, configuracion, software } = req.body;
        const modificada = await bitacoraSoftwareServices.modificarBitacoraSoftware({
            id,
            tipo,
            fecha,
            configuracion,
            software
        });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminada = await bitacoraSoftwareServices.borrarBitacoraSoftware(Number(id));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;