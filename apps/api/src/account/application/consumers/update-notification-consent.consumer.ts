import {
  NotificationConsent,
  NotificationType,
} from '@account/domain/entities';
import {
  DuplicatedNotificationConsentsException,
  NotificationTypeNotFoundException,
  UserNotFoundException,
} from '@account/domain/exceptions';
import {
  NotificationTypeRepository,
  UserRepository,
} from '@account/domain/repositories';

export class UpdateNotificationConsent
  implements UpdateNotificationConsent.Contract
{
  constructor(
    private userRepository: UserRepository,
    private notificationTypeRepository: NotificationTypeRepository,
  ) {}

  async execute({
    payload,
  }: UpdateNotificationConsent.Input): UpdateNotificationConsent.Output {
    const user = await this.userRepository.findByParam({
      key: 'id',
      value: payload.user.id,
    });
    if (!user) throw new UserNotFoundException();
    const notificationTypes = await this.validateNotificationTypes(
      payload.consents,
    );
    const notificationConsents = notificationTypes.map(
      (type) =>
        new NotificationConsent({
          slug: type.slug,
          userId: user.id,
          notificationTypeId: type.id,
        }),
    );
    user.notificationConsents = notificationConsents;
    await this.userRepository.syncNotificationConsents(user);
  }

  private async validateNotificationTypes(
    consents: UpdateNotificationConsent.Consent[],
  ): Promise<NotificationType[]> {
    const uniqueSlugs = [...new Set(consents.map((consent) => consent.id))];
    if (uniqueSlugs.length !== consents.length)
      throw new DuplicatedNotificationConsentsException();
    const enabledSlugs = consents
      .filter((consent) => consent.enabled)
      .map((consent) => consent.id);
    const notificationTypes =
      await this.notificationTypeRepository.findAllyBySlug(enabledSlugs);
    if (notificationTypes.length !== enabledSlugs.length)
      throw new NotificationTypeNotFoundException();
    return notificationTypes;
  }
}

export namespace UpdateNotificationConsent {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
    eventType: string;
    payload: Payload;
  };
  export type Payload = {
    user: {
      id: string;
    };
    consents: Consent[];
  };
  export type Consent = {
    id: string;
    enabled: boolean;
  };
  export type Output = Promise<void>;
}
