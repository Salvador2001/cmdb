import express, { Request, Response } from 'express';
import * as solicitudesCambioServices from '../services/solicitudesCambioServices';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    const solicitudes = await solicitudesCambioServices.obtieneSolicitudesCambio();
    res.send(solicitudes);
});

router.get('/:id', async (req: Request, res: Response) => {
    const solicitud = await solicitudesCambioServices.encuentraSolicitudCambio(Number(req.params.id));
    res.send(solicitud);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { fecha, estatus, requiere_comite, servicio, folio } = req.body;
        const nueva = await solicitudesCambioServices.agregarSolicitudCambio({ fecha, estatus, requiere_comite, servicio, folio });
        res.send(nueva);
    } catch (err) {
        res.status(400).send('No se puede agregar la solicitud de cambio');
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, fecha, estatus, requiere_comite, servicio, folio } = req.body;
        const modificada = await solicitudesCambioServices.modificarSolicitudCambio({ id, fecha, estatus, requiere_comite, servicio, folio });
        res.send(modificada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminada = await solicitudesCambioServices.borrarSolicitudCambio(Number(id));
        res.send(eliminada);
    } catch (e) {
        res.status(400).send('Error en los datos');
    }
});

export default router;