
import { Credential } from "../../../src/entities/Credential";
import { Validator } from '../../../src/entities/Validator';


// Mock the regex import
jest.mock("../../../src/data/regex", () => ({
  usernameRegex: /^[a-zA-Z0-9_]{3,16}$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
}));

// Manual mock for Credential class

describe('Validator.validatePassword() validatePassword method', () => {
  // Happy Path Tests
  describe('Happy paths', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return true for a valid password matching the regex', () => {
      // This test ensures that a valid password returns true.
      const validPassword = 'Password123';
      const credential = {
        getPassword: jest.fn().mockReturnValue(validPassword),
      } as unknown as jest.Mocked<Credential>;

      // Create Validator instance
      const validator = new Validator('user', 'user@email.com', validPassword);

      // Inject mock credential
      (validator as any).credential = credential;

      expect(validator.validatePassword()).toBe(true);
      expect(credential.getPassword).toHaveBeenCalledTimes(2);
    });

    it('should return false for an invalid password not matching the regex', () => {
      // This test ensures that an invalid password returns false.
      const invalidPassword = 'short';
      const credential = {
        getPassword: jest.fn().mockReturnValue(invalidPassword),
      } as unknown as jest.Mocked<Credential>;

      const validator = new Validator('user', 'user@email.com', invalidPassword);
      (validator as any).credential = credential;

      expect(validator.validatePassword()).toBe(false);
      expect(credential.getPassword).toHaveBeenCalledTimes(2);
    });

    it('should use the passwordRegex from the regex module', () => {
      // This test ensures that the passwordRegex from the regex module is used.
      const validPassword = 'Password123';
      const credential = {
        getPassword: jest.fn().mockReturnValue(validPassword),
      } as unknown as jest.Mocked<Credential>;

      const validator = new Validator('user', 'user@email.com', validPassword);
      (validator as any).credential = credential;

      // The regex is from the mock above
      expect(validator.validatePassword()).toBe(true);
    });
  });

  // Edge Case Tests
  describe('Edge cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });   
    

    it('should return false for an empty string password', () => {
      // This test ensures that an empty string password returns false.
      const credential = {
        getPassword: jest.fn().mockReturnValue(''),
      } as unknown as jest.Mocked<Credential>;

      const validator = new Validator('user', 'user@email.com', '');
      (validator as any).credential = credential;

      expect(validator.validatePassword()).toBe(false);
      expect(credential.getPassword).toHaveBeenCalledTimes(2);
    });

    it('should return false for a password with only numbers', () => {
      // This test ensures that a password with only numbers returns false.
      const credential = {
        getPassword: jest.fn().mockReturnValue('12345678'),
      } as unknown as jest.Mocked<Credential>;

      const validator = new Validator('user', 'user@email.com', '12345678');
      (validator as any).credential = credential;

      expect(validator.validatePassword()).toBe(false);
      expect(credential.getPassword).toHaveBeenCalledTimes(2);
    });

    it('should return false for a password with only letters', () => {
      // This test ensures that a password with only letters returns false.
      const credential = {
        getPassword: jest.fn().mockReturnValue('abcdefgh'),
      } as unknown as jest.Mocked<Credential>;

      const validator = new Validator('user', 'user@email.com', 'abcdefgh');
      (validator as any).credential = credential;

      expect(validator.validatePassword()).toBe(false);
      expect(credential.getPassword).toHaveBeenCalledTimes(2);
    });

    it('should return true for a password with minimum valid length and required characters', () => {
      // This test ensures that a password with exactly 8 characters, including letters and numbers, returns true.
      const credential = {
        getPassword: jest.fn().mockReturnValue('abc12345'),
      } as unknown as jest.Mocked<Credential>;

      const validator = new Validator('user', 'user@email.com', 'abc12345');
      (validator as any).credential = credential;

      expect(validator.validatePassword()).toBe(true);
      expect(credential.getPassword).toHaveBeenCalledTimes(2);
    });

    it('should throw TypeError if password is not a string (e.g., number)', () => {
      // This test ensures that if the password is a number, the regex test throws a TypeError.
      const credential = {
        getPassword: jest.fn().mockReturnValue(12345678),
      } as unknown as jest.Mocked<Credential>;

      const validator = new Validator('user', 'user@email.com', 'irrelevant');
      (validator as any).credential = credential;

      expect(() => validator.validatePassword()).toThrow(TypeError);
      expect(credential.getPassword).toHaveBeenCalledTimes(1);
    });
    

    test('should return false for a password with special characters if regex does not allow them', () => {
      // This test ensures that a password with special characters returns false if the regex does not allow them.
      const credential = {
        getPassword: jest.fn().mockReturnValue('Passw@rd1'),
      } as unknown as jest.Mocked<Credential>;

      const validator = new Validator('user', 'user@email.com', 'Passw@rd1');
      (validator as any).credential = credential;

      // The mocked regex does not allow special characters
      expect(validator.validatePassword()).toBe(false);
      expect(credential.getPassword).toHaveBeenCalledTimes(2);
    });
  });
});