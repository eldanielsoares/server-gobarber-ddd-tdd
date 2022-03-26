import { container } from 'tsyringe';
import AppointmentRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentRepository from '../../modules/appointments/repositories/IAppointmentRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepositories';
import IUsesrRepository from '../../modules/users/repositories/IUsersRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
);

container.registerSingleton<IUsesrRepository>(
  'UsersRepository',
  UsersRepository
);
