import { Router } from 'express';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/EnsureAuthenticaded';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', appointmentsController.show);

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
