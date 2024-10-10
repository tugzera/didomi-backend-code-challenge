export class EventConsumer implements EventConsumer.Contract {
  async execute(input: EventConsumer.Input): EventConsumer.Output {
    console.log('CHEGOU', input);
    throw new Error('FALHOU');
  }
}

export namespace EventConsumer {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input<T = any> = {
    eventType: string;
    payload: T;
  };
  export type Output = Promise<void>;
}
