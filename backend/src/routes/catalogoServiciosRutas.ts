import express, { Request, Response } from 'express';
import * as catalogoServiciosServices from '../services/catalogoServiciosServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let resultado = await catalogoServiciosServices.obtieneCatalogoServicios();
    res.send(resultado);
});

router.get('/:id', async (req: Request, res: Response) => {
    let resultado = await catalogoServiciosServices.encuentraCatalogoServicio(Number(req.params.id));
    res.send(resultado);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, tiempo_estimado } = req.body;
        const nuevo = await catalogoServiciosServices.agregarCatalogoServicio({ nombre, tiempo_estimado });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el servicio al catálogo');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, nombre, tiempo_estimado } = req.body;
        const modificada = await catalogoServiciosServices.modificarCatalogoServicio({ id, nombre, tiempo_estimado });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminada = await catalogoServiciosServices.borrarCatalogoServicio(Number(id));
        res.send(eliminada);
    }
    catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;