import { EntityRepository, Repository, getRepository } from 'typeorm';
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';
import IAppointmentRepository from '../../../repositories/IAppointmentRepository';
import Appointment from '../entities/Appointments';

@EntityRepository(Appointment)
class AppointmentRepository implements IAppointmentRepository {
  ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || null;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async listAllAppointments(
    provider_id: string
  ): Promise<Appointment[]> {
    const appointments = this.ormRepository.find({
      where: { provider_id },
    });

    return appointments;
  }
}

export default AppointmentRepository;
