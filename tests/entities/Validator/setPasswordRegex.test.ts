
import { passwordRegex } from "../../../src/data/regex";
import { Credential } from "../../../src/entities/Credential";
import { Validator } from '../../../src/entities/Validator';


// Manual Jest mock for Credential class
const mockCredential = {
  // Add methods as needed for future tests
  // For now, no methods are called in setPasswordRegex
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

describe('Validator.setPasswordRegex() setPasswordRegex method', () => {
  // Helper to create a Validator instance
  const createValidator = () => new Validator('user', 'user@email.com', 'Password123!');

  // --- Happy Paths ---
  describe('Happy paths', () => {
    it('should set passwordRegex to the provided valid RegExp', () => {
      // This test ensures that a valid RegExp is set correctly.
      const validator = createValidator();
      const customRegex = /customPassword/i;
      validator.setPasswordRegex(customRegex);
      // @ts-ignore: Accessing private for test
      expect((validator as any).passwordRegex).toBe(customRegex);
    });

    it('should set passwordRegex to the default passwordRegex when called with undefined', () => {
      // This test ensures that undefined input resets to default regex.
      const validator = createValidator();
      validator.setPasswordRegex(undefined as unknown as RegExp);
      // @ts-ignore: Accessing private for test
      expect((validator as any).passwordRegex).toBe(passwordRegex);
    });

    it('should set passwordRegex to the default passwordRegex when called with null', () => {
      // This test ensures that null input resets to default regex.
      const validator = createValidator();
      validator.setPasswordRegex(null as unknown as RegExp);
      // @ts-ignore: Accessing private for test
      expect((validator as any).passwordRegex).toBe(passwordRegex);
    });
  });

  // --- Edge Cases ---
  describe('Edge cases', () => {
    test('should throw TypeError if input is a string', () => {
      // This test ensures that a string input throws a TypeError.
      const validator = createValidator();
      expect(() => validator.setPasswordRegex('notARegex' as unknown as RegExp)).toThrow(
        new TypeError('Input must be a valid regexp')
      );
    });

    test('should throw TypeError if input is a number', () => {
      // This test ensures that a number input throws a TypeError.
      const validator = createValidator();
      expect(() => validator.setPasswordRegex(123 as unknown as RegExp)).toThrow(
        new TypeError('Input must be a valid regexp')
      );
    });

    test('should throw TypeError if input is an object (not RegExp)', () => {
      // This test ensures that a plain object input throws a TypeError.
      const validator = createValidator();
      expect(() => validator.setPasswordRegex({} as RegExp)).toThrow(
        new TypeError('Input must be a valid regexp')
      );
    });

    test('should throw TypeError if input is an array', () => {
      // This test ensures that an array input throws a TypeError.
      const validator = createValidator();
      expect(() => validator.setPasswordRegex([] as unknown as RegExp)).toThrow(
        new TypeError('Input must be a valid regexp')
      );
    });

    test('should throw TypeError if input is a boolean', () => {
      // This test ensures that a boolean input throws a TypeError.
      const validator = createValidator();
      expect(() => validator.setPasswordRegex(true as unknown as RegExp)).toThrow(
        new TypeError('Input must be a valid regexp')
      );
    });

    test('should throw TypeError if input is a function', () => {
      // This test ensures that a function input throws a TypeError.
      const validator = createValidator();
      expect(() => validator.setPasswordRegex((() => {}) as unknown as RegExp)).toThrow(
        new TypeError('Input must be a valid regexp')
      );
    });
  });
});