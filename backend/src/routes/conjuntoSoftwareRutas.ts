import express, { Request, Response } from 'express';
import * as conjuntoSoftwareServices from '../services/conjuntoSoftwareServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let conjuntoSoftware = await conjuntoSoftwareServices.obtieneConjuntoSoftware();
    res.send(conjuntoSoftware);
});

router.get('/:configuracion', async (req: Request, res: Response) => {
    let listaConjuntoSoftware = await conjuntoSoftwareServices.obtieneListaConjuntoSoftware(Number(req.params.configuracion));
    res.send(listaConjuntoSoftware);
});

router.get('/:configuracion/:software', async (req: Request, res: Response) => {
    let conjunto = await conjuntoSoftwareServices.encuentraConjuntoSoftware(Number(req.params.configuracion), Number(req.params.software));
    res.send(conjunto);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { configuracion, software } = req.body;
        const nuevo = await conjuntoSoftwareServices.agregarConjuntoSoftware({ configuracion, software });
        res.send(nuevo);
    } catch (err) {
        res.send('No se puede agregar el conjunto de software');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { configuracion, software } = req.body;
        const modificado = await conjuntoSoftwareServices.modificarConjuntoSoftware({ configuracion, software });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { configuracion, software } = req.body;
        const eliminado = await conjuntoSoftwareServices.borrarConjuntoSoftware(Number(configuracion), Number(software));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;