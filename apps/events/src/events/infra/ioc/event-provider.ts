export namespace EventProvider {
  export const CONSUMERS = {
    EVENT_CONSUMER: Symbol('EVENT_CONSUMER'),
  } as const;
  export const REPOSITORIES = {
    EVENT_REPOSITORY: Symbol('EVENT_REPOSITORY'),
  } as const;
}
