import express, { Request, Response } from 'express';
import * as componentesServices from '../services/componentesServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let componente = await componentesServices.obtieneComponentes();
    res.send(componente);
});

router.get('/:id', async (req: Request, res: Response) => {
    let componente = await componentesServices.encuentraComponente(Number(req.params.id));
    res.send(componente);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, fabricante, tipo, estatus, configuracion, rfc } = req.body;
        const nuevo = await componentesServices.agregarComponente({ nombre, fabricante, tipo, estatus, configuracion, rfc });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el componente');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, nombre, fabricante, tipo, estatus, configuracion, rfc } = req.body;
        const modificado = await componentesServices.modificarComponente({ id, nombre, fabricante, tipo, estatus, configuracion, rfc });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await componentesServices.borrarComponente(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;