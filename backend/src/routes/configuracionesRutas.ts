import express, { Request, Response } from 'express';
import * as configuracionesServices from '../services/configuracionesServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let configuraciones = await configuracionesServices.obtieneConfiguraciones();
    res.send(configuraciones);
});

router.get('/:id', async (req: Request, res: Response) => {
    let configuracion = await configuracionesServices.encuentraConfiguracion(Number(req.params.id));
    res.send(configuracion);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, fabricante, tipo, estatus, ubicacion } = req.body;
        const nueva = await configuracionesServices.agregarConfiguracion({ nombre, fabricante, tipo, estatus, ubicacion });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la configuración');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, nombre, fabricante, tipo, estatus, ubicacion } = req.body;
        const modificada = await configuracionesServices.modificarConfiguracion({ id, nombre, fabricante, tipo, estatus, ubicacion });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminada = await configuracionesServices.borrarConfiguracion(Number(id));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;