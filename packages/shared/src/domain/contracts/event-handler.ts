export interface EventHandler {
  send<T>(event: EventHandler.EventInput<T>): Promise<void>;
  consume<T>(
    queueName: string,
    consumer: EventHandler.Consumer<T>,
  ): Promise<void>;
}

export namespace EventHandler {
  export type EventInput<T> = {
    eventType: string;
    payload: T;
    queueName: string;
    routingKey?: string;
  };
  export interface Consumer<T> {
    execute(input: { eventType: string; payload: T }): Promise<void>;
  }
}
