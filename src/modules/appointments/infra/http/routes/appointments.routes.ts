import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const listProviderAppointments = new ProviderAppointmentsController();

appointmentsRouter.get('/me', listProviderAppointments.index);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
