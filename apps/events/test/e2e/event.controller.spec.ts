import { HttpCode } from '@repo/shared';
import { app } from '@test/setup';
import { randomUUID } from 'crypto';
import { agent } from 'supertest';

describe('EventController', () => {
  describe('@POST /events', () => {
    const url = '/events';
    it('should return UnprocessableEntityException if provided params not pass on validation pipe', async () => {
      await agent(app.getHttpServer())
        .post(url)
        .send({})
        .expect(({ status, body }) => {
          expect(status).toBe(HttpCode.UNPROCESSABLE_ENTITY);
          expect(body).toStrictEqual({
            error: {
              user: ['should not be empty', 'must be an object'],
              consents: [
                'must contain at least 1 elements',
                'should not be empty',
                'must be an array',
              ],
            },
            code: 'UnprocessableEntityException',
          });
        });
    });

    it('should return UnprocessableEntityException when provided data not pass on validation pipe', async () => {
      await agent(app.getHttpServer())
        .post(url)
        .send({
          user: {},
          consents: [{}],
        })
        .expect(({ status, body }) => {
          expect(status).toBe(HttpCode.UNPROCESSABLE_ENTITY);
          expect(body).toStrictEqual({
            error: {
              'user.id': ['should not be empty', 'must be a UUID'],
              'consents.0.id': [
                'must be one of the following values: email_notification, sms_notification',
                'should not be empty',
              ],
              'consents.0.enabled': [
                'must be a boolean value',
                'should not be empty',
              ],
            },
            code: 'UnprocessableEntityException',
          });
        });
    });

    it('should create a new event on success', async () => {
      await agent(app.getHttpServer())
        .post(url)
        .send({
          user: {
            id: randomUUID(),
          },
          consents: [{ id: 'email_notification', enabled: true }],
        })
        .expect(({ status }) => {
          expect(status).toBe(HttpCode.CREATED);
        });
    });
  });
});
