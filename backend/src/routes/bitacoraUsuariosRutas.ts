import express, { Request, Response } from 'express';
import * as bitacoraUsuariosServices from '../services/bitacoraUsuariosServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let bitacora = await bitacoraUsuariosServices.obtieneBitacoraUsuarios();
    res.send(bitacora);
});

router.get('/:id', async (req: Request, res: Response) => {
    let bitacora = await bitacoraUsuariosServices.encuentraBitacoraUsuario(Number(req.params.id));
    res.send(bitacora);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { fecha, operacion, usuario } = req.body;
        const nueva = await bitacoraUsuariosServices.agregarBitacoraUsuario({ fecha, operacion, usuario });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la bitácora de usuario');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, fecha, operacion, usuario } = req.body;
        const modificada = await bitacoraUsuariosServices.modificarBitacoraUsuario({ id, fecha, operacion, usuario });
        res.send(modificada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await bitacoraUsuariosServices.borrarBitacoraUsuario(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;