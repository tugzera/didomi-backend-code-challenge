export interface EventHandler<T = any> {
  send(event: EventHandler.EventInput<T>): Promise<void>;
  consume(
    queueName: string,
    callback: (payload: T) => Promise<void>,
  ): Promise<void>;
}

export namespace EventHandler {
  export type EventInput<T = any> = {
    eventType: string;
    queueName: string;
    payload: T;
  };
}
