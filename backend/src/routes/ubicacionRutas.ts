import express, { Request, Response } from 'express';
import * as ubicacionServices from '../services/ubicacionServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let ubicaciones = await ubicacionServices.obtieneUbicaciones();
    res.send(ubicaciones);
});

router.get('/:id', async (req: Request, res: Response) => {
    let ubicacion = await ubicacionServices.encuentraUbicacion(Number(req.params.id));
    res.send(ubicacion);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, tipo, edificio, departamento, responsable } = req.body;
        const nueva = await ubicacionServices.agregarUbicacion({ nombre, tipo, edificio, departamento, responsable });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la ubicación');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, nombre, tipo, edificio, departamento, responsable } = req.body;
        const modificada = await ubicacionServices.modificarUbicacion({ id, nombre, tipo, edificio, departamento, responsable });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminada = await ubicacionServices.borrarUbicacion(Number(id));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;