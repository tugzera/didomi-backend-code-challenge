import { Logger } from '@nestjs/common';
import { EventHandler } from '@shared/domain/contracts';
import { Channel, connect, Connection } from 'amqplib';

export class RabbitMQEventHandlerAdapter implements EventHandler {
  private static instance: RabbitMQEventHandlerAdapter;
  private connection: Connection;
  private credentials: RabbitMQEventHandlerAdapter.Credentials;
  private isConnected: boolean = false;
  private channel: Channel;
  private logger: Logger = new Logger();

  constructor(credentials: RabbitMQEventHandlerAdapter.Credentials) {
    this.credentials = credentials;
  }

  public static getInstance(
    credentials: RabbitMQEventHandlerAdapter.Credentials,
  ): RabbitMQEventHandlerAdapter {
    if (!RabbitMQEventHandlerAdapter.instance) {
      RabbitMQEventHandlerAdapter.instance = new RabbitMQEventHandlerAdapter(
        credentials,
      );
    }
    return RabbitMQEventHandlerAdapter.instance;
  }

  async connect() {
    try {
      this.connection = await connect(
        `amqp://${this.credentials.rmqUser}:${this.credentials.rmqPass}@${this.credentials.rmqHost}:${this.credentials.rmqPort}`,
      );
      this.channel = await this.connection.createChannel();
      this.isConnected = true;
      this.logger.log('Connected to RabbitMQ');
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to connect on RabbitMQ');
    }
  }

  async disconnect() {
    try {
      await this.connection.close();
      this.isConnected = false;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to disconnect on RabbitMQ');
    }
  }

  async send(event: EventHandler.EventInput): Promise<void> {
    if (!this.isConnected) throw new Error('Not connected to RabbitMQ');
    try {
      this.channel.sendToQueue(
        event.queueName,
        Buffer.from(
          JSON.stringify({
            eventType: event.eventType,
            payload: event.payload,
          }),
        ),
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to send event to RabbitMQ');
    }
  }

  async consume(
    queueName: string,
    consumer: EventHandler.Consumer,
  ): Promise<void> {
    if (!this.isConnected) throw new Error('Not connected to RabbitMQ');
    try {
      await this.channel.assertQueue(queueName, { durable: true });
      await this.channel.consume(queueName, async (message) => {
        try {
          const messageText = message?.content?.toString();
          if (!message || !messageText) throw new Error('Message is empty');
          const serializedMessage: { eventType: string; payload: object } =
            JSON.parse(messageText);
          this.logger.log(`Consuming event ${serializedMessage.eventType}`);
          this.logger.log(serializedMessage.payload);
          await consumer.execute(serializedMessage);
          this.channel.ack(message);
        } catch (error) {
          this.logger.error(error);
        }
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to consume event from RabbitMQ');
    }
  }
}

export namespace RabbitMQEventHandlerAdapter {
  export type Credentials = {
    rmqUser: string;
    rmqPass: string;
    rmqHost: string;
    rmqPort: string;
  };
}
