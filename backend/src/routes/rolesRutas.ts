import express, { Request, Response } from 'express';
import * as rolesServices from '../services/rolesServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let roles = await rolesServices.obtieneRoles();
    res.send(roles);
});

router.get('/:id', async (req: Request, res: Response) => {
    let rol = await rolesServices.encuentraRol(Number(req.params.id));
    res.send(rol);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre } = req.body;
        const nuevo = await rolesServices.agregarRol({ nombre });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el rol');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, nombre } = req.body;
        const modificado = await rolesServices.modificarRol({ id, nombre });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await rolesServices.borrarRol(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;