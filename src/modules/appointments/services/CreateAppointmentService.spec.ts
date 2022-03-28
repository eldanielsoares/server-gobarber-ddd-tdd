import AppError from '../../../shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakesAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new Appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const appoinment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1234',
    });

    expect(appoinment).toHaveProperty('id');
    expect(appoinment.provider_id).toBe('1234');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const appointmentDate = new Date(2022, 2, 28, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1234',
    });
    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
