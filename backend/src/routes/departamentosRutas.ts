import express, { Request, Response } from 'express';
import * as departamentosServices from '../services/departamentosServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let departamentos = await departamentosServices.obtieneDepartamentos();
    res.send(departamentos);
});

router.get('/:id', async (req: Request, res: Response) => {
    let departamento = await departamentosServices.encuentraDepartamento(Number(req.params.id));
    res.send(departamento);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, carrera } = req.body;
        const nuevo = await departamentosServices.agregarDepartamento({ nombre, carrera });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el departamento');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, nombre, carrera } = req.body;
        const modificado = await departamentosServices.modificarDepartamento({ id, nombre, carrera });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await departamentosServices.borrarDepartamento(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;