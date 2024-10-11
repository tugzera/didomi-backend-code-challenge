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
    queueName: string;
    routingKey?: string;
    payload: T;
  };
  export interface Consumer<T> {
    execute(input: T): Promise<void>;
  }
}
