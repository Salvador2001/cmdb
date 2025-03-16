import express, { Request, Response } from 'express';
import * as bitacoraConfiguracionServices from '../services/bitacoraConfiguracionServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let bitacoraConfiguracion = await bitacoraConfiguracionServices.obtieneBitacoraConfiguracion();
    res.send(bitacoraConfiguracion);
});

router.get('/:id', async (req: Request, res: Response) => {
    let bitacoraConfiguracion = await bitacoraConfiguracionServices.encuentraBitacoraConfiguracion(Number(req.params.id));
    res.send(bitacoraConfiguracion);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { tipo, fecha, configuracion } = req.body;
        const nueva = await bitacoraConfiguracionServices.agregarBitacoraConfiguracion({
            tipo,
            fecha,
            configuracion
        });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la bitácora de configuración');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, tipo, fecha, configuracion } = req.body;
        const modificada = await bitacoraConfiguracionServices.modificarBitacoraConfiguracion({
            id,
            tipo,
            fecha,
            configuracion
        });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminada = await bitacoraConfiguracionServices.borrarBitacoraConfiguracion(Number(id));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;