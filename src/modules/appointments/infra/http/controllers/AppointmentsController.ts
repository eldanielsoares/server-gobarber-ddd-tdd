import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import ListAppointmentService from '../../../services/ListAllAppointments';

export default class AppointtmentsCrontroller {
  public async create(request: Request, response: Response): Promise<Response> {
    const { date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id: request.user.id,
    });

    return response.json(appointment);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listAppointmentService = container.resolve(ListAppointmentService);

    const appointments = await listAppointmentService.execute(request.user.id);

    return response.json(appointments);
  }
}
