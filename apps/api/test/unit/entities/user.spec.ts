import { DomainValidationException } from '@repo/shared';
import { User } from '@users/domain/entities';
import { randomBytes } from 'crypto';

describe('UserEntity', () => {
  it('should reject user email if provided email is not valid', () => {
    expect(() => {
      User.create({
        email: randomBytes(101).toString('hex'),
        firstName: 'Teste',
        lastName: 'Teste',
        password: '123456789',
        phoneNumber: '+551199999999',
      });
    }).toThrow(new DomainValidationException('Invalid email'));
  });

  it('should reject user firstName if provided firstName is not valid', () => {
    expect(() => {
      User.create({
        email: 'teste@email.com',
        firstName: '',
        lastName: 'Teste',
        password: '123456789',
        phoneNumber: '+551199999999',
      });
    }).toThrow(new DomainValidationException('Invalid first name'));
  });

  it('should reject user firstName length is not valid', () => {
    expect(() => {
      User.create({
        email: 'teste@email.com',
        firstName: randomBytes(101).toString('hex'),
        lastName: 'Teste',
        password: '123456789',
        phoneNumber: '+551199999999',
      });
    }).toThrow(new DomainValidationException('Invalid first name'));
  });

  it('should reject user lastName if provided lastName is not valid', () => {
    expect(() => {
      User.create({
        email: 'teste@email.com',
        firstName: 'Test',
        lastName: '',
        password: '123456789',
        phoneNumber: '+551199999999',
      });
    }).toThrow(new DomainValidationException('Invalid last name'));
  });

  it('should reject user lastName length is not valid', () => {
    expect(() => {
      User.create({
        email: 'teste@email.com',
        firstName: 'Test',
        lastName: randomBytes(101).toString('hex'),
        password: '123456789',
        phoneNumber: '+551199999999',
      });
    }).toThrow(new DomainValidationException('Invalid last name'));
  });

  it('should reject user password if provided password is not valid', () => {
    expect(() => {
      User.create({
        email: 'teste@email.com',
        firstName: 'Test',
        lastName: 'Test',
        password: '1234567',
        phoneNumber: '+551199999999',
      });
    }).toThrow(new DomainValidationException('Invalid password'));
  });

  it('should reject user password length is not valid', () => {
    expect(() => {
      User.create({
        email: 'teste@email.com',
        firstName: 'Test',
        lastName: 'Test',
        password: randomBytes(101).toString('hex'),
        phoneNumber: '+551199999999',
      });
    }).toThrow(new DomainValidationException('Invalid password'));
  });
});
