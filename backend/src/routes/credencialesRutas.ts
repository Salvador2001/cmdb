import express, { Request, Response } from 'express';
import * as credencialesServices from '../services/credencialesServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let credenciales = await credencialesServices.obtieneCredenciales();
    res.send(credenciales);
});

router.get('/:id', async (req: Request, res: Response) => {
    let credencial = await credencialesServices.encuentraCredencial(Number(req.params.id));
    res.send(credencial);
});

router.get('/correo/:correo', async (req: Request, res: Response) => {
    let credencial = await credencialesServices.encuentraCredencialPorCorreo(String(req.params.correo));
    res.send(credencial);
});

router.get('/auth/:correo/:contrasenia', async (req: Request, res: Response) => {
    let credencial = await credencialesServices.encuentraCredencialPorAuth(String(req.params.correo), String(req.params.contrasenia));
    res.send(credencial);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { correo, contrasenia, usuario } = req.body;
        const nuevo = await credencialesServices.agregarCredencial({ correo, contrasenia, usuario });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar la credencial');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, correo, contrasenia, usuario } = req.body;
        const modificado = await credencialesServices.modificarCredencial({ id, correo, contrasenia, usuario });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await credencialesServices.borrarCredencial(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;