import { EventHandler } from '@shared/domain/contracts';
import { mock } from 'jest-mock-extended';

const eventHandlerMock = mock<EventHandler>();
eventHandlerMock.send.mockImplementation(async () => {});
eventHandlerMock.consume.mockImplementation(async () => {});

export { eventHandlerMock };
