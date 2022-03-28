import { v4 } from 'uuid';
import { isEqual } from 'date-fns';
import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointments';
import IAppointmentRepository from '../IAppointmentRepository';

class FakeAppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find((findAppointment) =>
      isEqual(findAppointment.date, date)
    );

    return appointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async listAllAppointments(
    provider_id: string
  ): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (filterAppointments) => filterAppointments.provider_id === provider_id
    );

    return appointments;
  }
}

export default FakeAppointmentRepository;
