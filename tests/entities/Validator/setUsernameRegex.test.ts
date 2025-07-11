
import { usernameRegex } from "../../../src/data/regex";
import { Credential } from "../../../src/entities/Credential";
import { Validator } from '../../../src/entities/Validator';


// Manual Jest mock for Credential class
const mockCredential = {
  // Add methods as needed for future tests
} as unknown as jest.Mocked<Credential>;

// Mock the Credential constructor to always return the mockCredential
jest.mock("../../../src/entities/Credential", () => ({
  Credential: jest.fn().mockImplementation(() => mockCredential),
}));

describe('Validator.setUsernameRegex() setUsernameRegex method', () => {
  // Happy Path Tests
  describe('Happy paths', () => {
    it('should set a valid RegExp as the username regex', () => {
      // This test ensures that a valid RegExp is set correctly
      const validator = new Validator('user', 'user@email.com', 'password');
      const customRegex = /^[a-z]{3,10}$/;
      validator.setUsernameRegex(customRegex);

      // @ts-ignore: Accessing private property for test
      expect((validator as any).usernameRegex).toBe(customRegex);
    });

    it('should reset to default usernameRegex when called with undefined', () => {
      // This test ensures that passing undefined resets to the default regex
      const validator = new Validator('user', 'user@email.com', 'password');
      // Set a custom regex first
      const customRegex = /^[a-z]{3,10}$/;
      validator.setUsernameRegex(customRegex);

      // Now reset to default
      validator.setUsernameRegex(undefined as unknown as RegExp);

      // @ts-ignore: Accessing private property for test
      expect((validator as any).usernameRegex).toBe(usernameRegex);
    });
  });

  // Edge Case Tests
  describe('Edge cases', () => {
    it('should throw TypeError if input is not a RegExp (string)', () => {
      // This test ensures that a string input throws a TypeError
      const validator = new Validator('user', 'user@email.com', 'password');
      expect(() => {
        validator.setUsernameRegex('not-a-regex' as unknown as RegExp);
      }).toThrow(new TypeError('Input must be a valid regexp'));
    });

    it('should throw TypeError if input is not a RegExp (number)', () => {
      // This test ensures that a number input throws a TypeError
      const validator = new Validator('user', 'user@email.com', 'password');
      expect(() => {
        validator.setUsernameRegex(123 as unknown as RegExp);
      }).toThrow(new TypeError('Input must be a valid regexp'));
    });

    it('should throw TypeError if input is not a RegExp (object)', () => {
      // This test ensures that a plain object input throws a TypeError
      const validator = new Validator('user', 'user@email.com', 'password');
      expect(() => {
        validator.setUsernameRegex({} as RegExp);
      }).toThrow(new TypeError('Input must be a valid regexp'));
    });

    it('should throw TypeError if input is not a RegExp (array)', () => {
      // This test ensures that an array input throws a TypeError
      const validator = new Validator('user', 'user@email.com', 'password');
      expect(() => {
        validator.setUsernameRegex([] as unknown as RegExp);
      }).toThrow(new TypeError('Input must be a valid regexp'));
    });

    it('should reset to default usernameRegex when called with null', () => {
      // This test ensures that passing null resets to the default regex
      const validator = new Validator('user', 'user@email.com', 'password');
      // Set a custom regex first
      const customRegex = /^[a-z]{3,10}$/;
      validator.setUsernameRegex(customRegex);

      // Now reset to default
      validator.setUsernameRegex(null as unknown as RegExp);

      // @ts-ignore: Accessing private property for test
      expect((validator as any).usernameRegex).toBe(usernameRegex);
    });
  });
});