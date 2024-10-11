export interface EventHandler {
  send<T = any>(event: EventHandler.EventInput<T>): Promise<void>;
  consume<T = any>(
    queueName: string,
    consumer: EventHandler.Consumer<T>,
  ): Promise<void>;
}

export namespace EventHandler {
  export type EventInput<T = any> = {
    eventType: string;
    queueName: string;
    routingKey?: string;
    payload: T;
  };
  export interface Consumer<T = any> {
    execute(input: T): Promise<void>;
  }
}
