import express, { Request, Response } from 'express';
import * as bitacoraComponentesServices from '../services/bitacoraComponentesServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let bitacoraComponentes = await bitacoraComponentesServices.obtieneBitacoraComponentes();
    res.send(bitacoraComponentes);
});

router.get('/:id', async (req: Request, res: Response) => {
    let bitacoraComponentes = await bitacoraComponentesServices.encuentraBitacoraComponentes(Number(req.params.id));
    res.send(bitacoraComponentes);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { operacion, fecha, componente } = req.body;
        const nueva = await bitacoraComponentesServices.agregarBitacoraComponentes({
            operacion,
            fecha,
            componente
        });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la bitácora de componentes');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, operacion, fecha, componente } = req.body;
        const modificada = await bitacoraComponentesServices.modificarBitacoraComponentes({
            id,
            operacion,
            fecha,
            componente
        });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminada = await bitacoraComponentesServices.borrarBitacoraComponentes(Number(id));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;