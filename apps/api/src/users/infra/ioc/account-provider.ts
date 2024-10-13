export namespace AccountProvider {
  export const REPOSITORIES = {
    USER_REPOSITORY: Symbol('USER_REPOSITORY'),
    NOTIFICATION_TYPE_REPOSITORY: Symbol('NOTIFICATION_TYPE_REPOSITORY'),
  } as const;
  export const COMMANDS = {
    CREATE_USER: Symbol('CREATE_USER'),
    UPDATE_USER: Symbol('UPDATE_USER'),
    DELETE_USER: Symbol('DELETE_USER'),
  } as const;
  export const QUERIES = {
    GET_USER_LIST: Symbol('GET_USER_LIST'),
    GET_USER_DETAILS: Symbol('GET_USER_DETAILS'),
  } as const;
  export const CONSUMERS = {
    UPDATE_NOTIFICATION_CONSENT: Symbol('UPDATE_NOTIFICATION_CONSENT'),
  } as const;
}
