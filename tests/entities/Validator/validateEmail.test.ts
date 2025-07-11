
import { emailRegex } from "../../../src/data/regex";
import { Credential } from "../../../src/entities/Credential";
import { Validator } from '../../../src/entities/Validator';


// Manual Jest mock for Credential class
const mockCredential = {
  getEmail: jest.fn(),
} as unknown as jest.Mocked<Credential>;

// Helper to inject mockCredential into Validator instance
function createValidatorWithMockCredential(emailValue: string | null) {
  // Mock getEmail to return the desired value
  jest.mocked(mockCredential.getEmail).mockReset();
  jest.mocked(mockCredential.getEmail).mockReturnValue(emailValue as any);

  // Create a Validator instance (constructor will create its own Credential, but we will override it)
  const validator = new Validator('user', 'test@example.com', 'Password123!');
  // Override the credential property with our mock
  (validator as any).credential = mockCredential;
  return validator;
}

describe('Validator.validateEmail() validateEmail method', () => {
  //
  // Happy Path Tests
  //
  describe('Happy paths', () => {
    test('should return true for a valid email address', () => {
      // This test ensures that a valid email returns true
      const validEmail = 'user@example.com';
      const validator = createValidatorWithMockCredential(validEmail);

      // Use the actual regex from the module
      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(true);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });

    test('should return false for an invalid email address', () => {
      // This test ensures that an invalid email returns false
      const invalidEmail = 'invalid-email';
      const validator = createValidatorWithMockCredential(invalidEmail);

      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(false);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });

    test('should return true for a valid email with subdomain', () => {
      // This test ensures that emails with subdomains are accepted
      const validEmail = 'user@mail.example.com';
      const validator = createValidatorWithMockCredential(validEmail);

      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(true);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });

    it('should return true for a valid email with plus sign', () => {
      // This test ensures that emails with plus addressing are accepted
      const validEmail = 'user+test@example.com';
      const validator = createValidatorWithMockCredential(validEmail);

      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(true);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });
  });

  //
  // Edge Case Tests
  //
  describe('Edge cases', () => {

    it('should return false for an empty string email', () => {
      // This test ensures that an empty string is not considered a valid email
      const validator = createValidatorWithMockCredential('');

      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(false);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });

    it('should return false for an email with only spaces', () => {
      // This test ensures that an email with only whitespace is not valid
      const validator = createValidatorWithMockCredential('   ');

      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(false);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });

    it('should return false for an email missing "@" symbol', () => {
      // This test ensures that an email missing the "@" symbol is not valid
      const validator = createValidatorWithMockCredential('user.example.com');

      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(false);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });

    it('should return false for an email with invalid domain', () => {
      // This test ensures that an email with an invalid domain is not valid
      const validator = createValidatorWithMockCredential('user@.com');

      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(false);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });

    it('should return false for an email with special characters in local part', () => {
      // This test ensures that an email with invalid special characters is not valid
      const validator = createValidatorWithMockCredential('user!@example.com');

      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(false);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });

    it('should return false for an email with consecutive dots', () => {
      // This test ensures that an email with consecutive dots is not valid
      const validator = createValidatorWithMockCredential('user..name@example.com');

      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(false);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });

    it('should return false for an email with a trailing dot in local part', () => {
      // This test ensures that an email with a trailing dot in the local part is not valid
      const validator = createValidatorWithMockCredential('user.@example.com');

      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(false);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });
    

    it('should return false for an email with a leading dot in local part', () => {
      // This test ensures that an email with a leading dot in the local part is not valid
      const validator = createValidatorWithMockCredential('.user@example.com');

      (validator as any).emailRegex = emailRegex;

      const result = validator.validateEmail();
      expect(result).toBe(false);
      expect(mockCredential.getEmail).toHaveBeenCalled();
    });

    it('should throw TypeError if email is not a string (e.g., number)', () => {
      // This test ensures that if the email is a number, the regex test throws a TypeError.
      const credential = {
        getEmail: jest.fn().mockReturnValue(12345678),
      } as unknown as jest.Mocked<Credential>;

      const validator = new Validator('user', 'user@email.com', 'irrelevant');
      (validator as any).credential = credential;

      expect(() => validator.validateEmail()).toThrow(TypeError);
      expect(credential.getEmail).toHaveBeenCalledTimes(1);
    });
  });
});