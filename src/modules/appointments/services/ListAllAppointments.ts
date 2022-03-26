/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

@injectable()
class ListAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute(provider_id: string): Promise<Appointment[]> {
    const appointment =
      this.appointmentsRepository.listAllAppointments(provider_id);

    return appointment;
  }
}

export default ListAppointmentService;
