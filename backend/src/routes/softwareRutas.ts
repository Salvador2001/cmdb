import express, { Request, Response } from 'express';
import * as softwareServices from '../services/softwareServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let software = await softwareServices.obtieneSoftware();
    res.send(software);
});

router.get('/:id', async (req: Request, res: Response) => {
    let software = await softwareServices.encuentraSoftware(Number(req.params.id));
    res.send(software);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, desarrollador, tipo, licencia, version, descripcion } = req.body;
        const nuevo = await softwareServices.agregarSoftware({
            nombre,
            desarrollador,
            tipo,
            licencia,
            version,
            descripcion
        });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el software');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, nombre, desarrollador, tipo, licencia, version, descripcion } = req.body;
        const modificado = await softwareServices.modificarSoftware({
            id,
            nombre,
            desarrollador,
            tipo,
            licencia,
            version,
            descripcion
        });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await softwareServices.borrarSoftware(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;