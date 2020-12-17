import { Router } from 'express';
import appointmentsRouter from '../modules/appointments/routes/appointments.routes';
import ensureAuthenticated from '../modules/users/middlewares/ensureAuthenticated';
import sessionsRouter from '../modules/users/routes/sessions.routes';
import usersRouter from '../modules/users/routes/users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', sessionsRouter);

routes.use(ensureAuthenticated);
routes.use('/appointments', appointmentsRouter);

export default routes;
