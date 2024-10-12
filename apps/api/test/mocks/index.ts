import { EventHandler } from '@repo/shared';
import { mock } from 'jest-mock-extended';

const eventHandlerMock = mock<EventHandler>();
eventHandlerMock.send.mockImplementation(async () => {});
eventHandlerMock.consume.mockImplementation(async () => {});

export { eventHandlerMock };
