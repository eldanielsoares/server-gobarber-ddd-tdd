// import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/EnsureAuthenticaded';
import ListAppointmentService from '../../../services/ListAllAppointments';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
  const listAppointmentService = container.resolve(ListAppointmentService);

  const appointments = await listAppointmentService.execute(request.user.id);

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  const { date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id: request.user.id,
  });

  return response.json(appointment);
});

export default appointmentRouter;
