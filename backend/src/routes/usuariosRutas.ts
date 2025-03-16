import express, { Request, Response } from 'express';
import * as usuariosServices from '../services/usuariosServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let usuarios = await usuariosServices.obtieneUsuarios();
    res.send(usuarios);
});

router.get('/:id', async (req: Request, res: Response) => {
    let usuario = await usuariosServices.encuentraUsuario(Number(req.params.id));
    res.send(usuario);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, correo, rol, departamento } = req.body;
        const nuevo = await usuariosServices.agregarUsuario({ nombre, correo, rol, departamento });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el usuario');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, nombre, correo, rol, departamento } = req.body;
        const modificado = await usuariosServices.modificarUsuario({ id, nombre, correo, rol, departamento });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await usuariosServices.borrarUsuario(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;