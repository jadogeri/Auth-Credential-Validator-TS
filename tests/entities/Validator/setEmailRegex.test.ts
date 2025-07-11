
import { emailRegex } from "../../../src/data/regex";
import { Credential } from "../../../src/entities/Credential";
import { Validator } from '../../../src/entities/Validator';


// Manual Jest mock for Credential class
const mockCredential = {
  // Add methods as needed for future tests
  // For now, no methods are called in setEmailRegex
} as unknown as jest.Mocked<Credential>;

// Mock the Credential constructor to always return our mockCredential
jest.mock("../../../src/entities/Credential", () => {
  return {
    Credential: jest.fn(() => mockCredential),
  };
});

// Mock regex imports
jest.mock("../../../src/data/regex", () => ({
  usernameRegex: /mockUsername/,
  emailRegex: /mockEmail/,
  passwordRegex: /mockPassword/,
}));

describe('Validator.setEmailRegex() setEmailRegex method', () => {
  // Happy Path Tests
  describe('Happy paths', () => {
    it('should set a valid custom email regex', () => {
      // This test ensures that a valid RegExp is set as the emailRegex
      const validator = new Validator('user', 'user@email.com', 'password');
      const customRegex = /customEmail/i;
      validator.setEmailRegex(customRegex);
      // @ts-ignore: access private for test
      expect((validator as any).emailRegex).toBe(customRegex);
    });

    it('should reset to default emailRegex when called with undefined', () => {
      // This test ensures that passing undefined resets to the default emailRegex
      const validator = new Validator('user', 'user@email.com', 'password');
      // Set a custom regex first
      const customRegex = /customEmail/i;
      validator.setEmailRegex(customRegex);
      // Now reset to default
      validator.setEmailRegex(undefined as unknown as RegExp);
      // @ts-ignore: access private for test
      expect((validator as any).emailRegex).toBe(emailRegex);
    });
  });

  // Edge Case Tests
  describe('Edge cases', () => {
    it('should throw TypeError if input is not a RegExp (string)', () => {
      // This test ensures that passing a string throws a TypeError
      const validator = new Validator('user', 'user@email.com', 'password');
      expect(() => {
        validator.setEmailRegex('notARegex' as unknown as RegExp);
      }).toThrow(new TypeError('Input must be a valid regexp'));
    });

    it('should throw TypeError if input is not a RegExp (number)', () => {
      // This test ensures that passing a number throws a TypeError
      const validator = new Validator('user', 'user@email.com', 'password');
      expect(() => {
        validator.setEmailRegex(123 as unknown as RegExp);
      }).toThrow(new TypeError('Input must be a valid regexp'));
    });

    it('should throw TypeError if input is not a RegExp (object)', () => {
      // This test ensures that passing a plain object throws a TypeError
      const validator = new Validator('user', 'user@email.com', 'password');
      expect(() => {
        validator.setEmailRegex({} as RegExp);
      }).toThrow(new TypeError('Input must be a valid regexp'));
    });

    it('should throw TypeError if input is not a RegExp (array)', () => {
      // This test ensures that passing an array throws a TypeError
      const validator = new Validator('user', 'user@email.com', 'password');
      expect(() => {
        validator.setEmailRegex([] as unknown as RegExp);
      }).toThrow(new TypeError('Input must be a valid regexp'));
    });

    it('should reset to default emailRegex when called with null', () => {
      // This test ensures that passing null resets to the default emailRegex
      const validator = new Validator('user', 'user@email.com', 'password');
      // Set a custom regex first
      const customRegex = /customEmail/i;
      validator.setEmailRegex(customRegex);
      // Now reset to default
      validator.setEmailRegex(null as unknown as RegExp);
      // @ts-ignore: access private for test
      expect((validator as any).emailRegex).toBe(emailRegex);
    });

    it('should not throw if called multiple times with valid regex', () => {
      // This test ensures that multiple valid calls work as expected
      const validator = new Validator('user', 'user@email.com', 'password');
      const regex1 = /first/i;
      const regex2 = /second/i;
      validator.setEmailRegex(regex1);
      // @ts-ignore: access private for test
      expect((validator as any).emailRegex).toBe(regex1);
      validator.setEmailRegex(regex2);
      // @ts-ignore: access private for test
      expect((validator as any).emailRegex).toBe(regex2);
    });
  });
});