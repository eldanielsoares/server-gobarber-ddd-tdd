/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointments';
import AppointmentRepository from '../infra/typeorm/repositories/AppointmentRepository';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface Request {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is ready booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
