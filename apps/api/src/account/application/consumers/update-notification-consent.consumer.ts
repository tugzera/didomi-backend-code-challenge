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

  async execute(
    input: UpdateNotificationConsent.Input,
  ): UpdateNotificationConsent.Output {
    const user = await this.userRepository.findByParam({
      key: 'id',
      value: input.user.id,
    });
    if (!user) throw new UserNotFoundException();
    const notificationTypes = await this.validateNotificationTypes(
      input.consents,
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
    const enabledConsents = consents.filter((consent) => consent.enabled);
    const uniqueSlugs = [
      ...new Set(enabledConsents.map((consent) => consent.id)),
    ];
    if (uniqueSlugs.length !== consents.length)
      throw new DuplicatedNotificationConsentsException();
    const notificationTypes =
      await this.notificationTypeRepository.findAllyBySlug(uniqueSlugs);
    if (notificationTypes.length !== uniqueSlugs.length)
      throw new NotificationTypeNotFoundException();
    return notificationTypes;
  }
}

export namespace UpdateNotificationConsent {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
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
