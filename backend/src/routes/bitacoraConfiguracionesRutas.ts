import express, { Request, Response } from 'express';
import * as bitacoraConfiguracionesServices from '../services/bitacoraConfiguracionesServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let bitacoraConfiguraciones = await bitacoraConfiguracionesServices.obtieneBitacoraConfiguraciones();
    res.send(bitacoraConfiguraciones);
});

router.get('/:id', async (req: Request, res: Response) => {
    let bitacoraConfiguraciones = await bitacoraConfiguracionesServices.encuentraBitacoraConfiguraciones(Number(req.params.id));
    res.send(bitacoraConfiguraciones);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { operacion, fecha, configuracion } = req.body;
        const nueva = await bitacoraConfiguracionesServices.agregarBitacoraConfiguraciones({
            operacion,
            fecha,
            configuracion
        });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la bitácora de configuraciones');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, operacion, fecha, configuracion } = req.body;
        const modificada = await bitacoraConfiguracionesServices.modificarBitacoraConfiguraciones({
            id,
            operacion,
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
        const eliminada = await bitacoraConfiguracionesServices.borrarBitacoraConfiguraciones(Number(id));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;