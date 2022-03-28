import Appointment from '../infra/typeorm/entities/Appointments';
import FakeAppointmentRepository from '../repositories/fakes/FakesAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';
import ListAppointmentService from './ListAllAppointments';

describe('ListAppointAppointment', () => {
  it('should be able to list all Appointments', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createApppointment = new CreateAppointmentService(
      fakeAppointmentRepository
    );
    const listAllAppointments = new ListAppointmentService(
      fakeAppointmentRepository
    );

    const appointment = await createApppointment.execute({
      date: new Date(),
      provider_id: '1234',
    });

    const appointmentList: Appointment[] = [];

    appointmentList.push(appointment);

    const listAllAppointmentsFilter = await listAllAppointments.execute('1234');

    expect(listAllAppointmentsFilter).toEqual(appointmentList);
  });
});
