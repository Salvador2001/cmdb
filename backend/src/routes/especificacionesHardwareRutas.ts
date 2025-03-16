import express, { Request, Response } from 'express';
import * as especificacionesHardwareServices from '../services/especificacionesHardwareServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    let especificacionesHardware = await especificacionesHardwareServices.obtieneEspecificacionesHardware();
    res.send(especificacionesHardware);
});

router.get('/:hardware/:especificacion', async (req: Request, res: Response) => {
    let especificacionHardware = await especificacionesHardwareServices.encuentraEspecificacionHardware(Number(req.params.hardware), Number(req.params.especificacion));
    res.send(especificacionHardware);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { hardware, especificacion } = req.body;
        const nueva = await especificacionesHardwareServices.agregarEspecificacionHardware({ hardware, especificacion });
        res.send(nueva);
    } catch (err) {
        res.send('No se puede agregar la especificación de hardware');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { hardware, especificacion } = req.body;
        const modificada = await especificacionesHardwareServices.modificarEspecificacionHardware({ hardware, especificacion });
        res.send(modificada);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { hardware, especificacion } = req.body;
        const eliminada = await especificacionesHardwareServices.borrarEspecificacionHardware(Number(hardware), Number(especificacion));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;