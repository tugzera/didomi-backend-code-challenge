import { UpdateNotificationConsent } from '@users/application/consumers';
import { NotificationType, User } from '@users/domain/entities';
import {
  DuplicatedNotificationConsentsException,
  NotificationTypeNotFoundException,
  UserNotFoundException,
} from '@users/domain/exceptions';
import {
  NotificationTypeRepository,
  UserRepository,
} from '@users/domain/repositories';
import { mock, MockProxy } from 'jest-mock-extended';

describe('UpdateNotificationConsentConsumer', () => {
  let sut: UpdateNotificationConsent;
  let userRepository: MockProxy<UserRepository>;
  let notificationTypeRepository: MockProxy<NotificationTypeRepository>;

  beforeAll(() => {
    userRepository = mock<UserRepository>();
    notificationTypeRepository = mock<NotificationTypeRepository>();
    sut = new UpdateNotificationConsent(
      userRepository,
      notificationTypeRepository,
    );
  });

  it('should throw UserNotFoundException if provided userId is not found', async () => {
    userRepository.findByParam.mockResolvedValueOnce(null);
    await expect(
      sut.execute({
        eventType: 'NOTIFICATION_CONSENTS_UPDATED',
        payload: {
          user: {
            id: '00000000-0000-0000-0000-000000000000',
          },
          consents: [],
        },
      }),
    ).rejects.toThrow(new UserNotFoundException());
  });

  it('should throw DuplicatedNotificationConsentsException if duplicated notification consents are provided', async () => {
    userRepository.findByParam.mockResolvedValueOnce(new User({}));
    await expect(
      sut.execute({
        eventType: 'NOTIFICATION_CONSENTS_UPDATED',
        payload: {
          user: {
            id: '00000000-0000-0000-0000-000000000000',
          },
          consents: [
            { id: 'email_notification', enabled: true },
            { id: 'email_notification', enabled: true },
          ],
        },
      }),
    ).rejects.toThrow(new DuplicatedNotificationConsentsException());
  });

  it('should throw NotificationTypeNotFoundException if duplicated notification consents are provided', async () => {
    userRepository.findByParam.mockResolvedValueOnce(new User({}));
    notificationTypeRepository.findAllyBySlug.mockResolvedValueOnce([]);
    await expect(
      sut.execute({
        eventType: 'NOTIFICATION_CONSENTS_UPDATED',
        payload: {
          user: {
            id: '00000000-0000-0000-0000-000000000000',
          },
          consents: [{ id: 'email_notification', enabled: true }],
        },
      }),
    ).rejects.toThrow(new NotificationTypeNotFoundException());
  });

  it('should save notification type on success', async () => {
    userRepository.findByParam.mockResolvedValueOnce(new User({}));
    notificationTypeRepository.findAllyBySlug.mockResolvedValueOnce([
      new NotificationType({}),
    ]);
    await expect(
      sut.execute({
        eventType: 'NOTIFICATION_CONSENTS_UPDATED',
        payload: {
          user: {
            id: '00000000-0000-0000-0000-000000000000',
          },
          consents: [{ id: 'email_notification', enabled: true }],
        },
      }),
    ).resolves.toBeUndefined();
  });
});
