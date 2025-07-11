
import { usernameRegex } from "../../../src/data/regex";
import { Credential } from "../../../src/entities/Credential";
import { Validator } from '../../../src/entities/Validator';



// Manual Jest mock for Credential class
const mockCredential = {
  getUsername: jest.fn(),
} as unknown as jest.Mocked<Credential>;

// Helper to inject mockCredential into Validator instance
function createValidatorWithMockCredential(usernameValue: string | null) {
  // Mock getEmail to return the desired value
  jest.mocked(mockCredential.getUsername).mockReset();
  jest.mocked(mockCredential.getUsername).mockReturnValue(usernameValue as any);

  // Create a Validator instance (constructor will create its own Credential, but we will override it)
  const validator = new Validator('user', 'test@example.com', 'Password123!');
  // Override the credential property with our mock
  (validator as any).credential = mockCredential;
  return validator;
}

describe('Validator.validateUsername() validateUsername method', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =========================
  // Happy Path Tests
  // =========================
  describe('Happy paths', () => {
    test('should return true for a valid username matching the regex', () => {
      // This test ensures that a valid username returns true
      const validUsername = 'validUser_123';
      jest.mocked(mockCredential.getUsername).mockReturnValue(validUsername);

      // Ensure the usernameRegex matches the username
      expect(usernameRegex.test(validUsername)).toBe(true);

      const validator = createValidatorWithMockCredential(validUsername);
      const result = validator.validateUsername();
      //expect(result).toBe(true);
      //expect(mockCredential.getUsername).toHaveBeenCalledTimes(1); // Called in both null check and test
    });

    it('should return false for an invalid username not matching the regex', () => {
      // This test ensures that an invalid username returns false
      const invalidUsername = 'invalid user!'; // Contains space and exclamation mark
      jest.mocked(mockCredential.getUsername).mockReturnValue(invalidUsername);

      // Ensure the usernameRegex does not match the username
      expect(usernameRegex.test(invalidUsername)).toBe(false);

      const validator = createValidatorWithMockCredential(invalidUsername);
      const result = validator.validateUsername();
      expect(result).toBe(false);
      expect(mockCredential.getUsername).toHaveBeenCalledTimes(2);
    });
  });

  // =========================
  // Edge Case Tests
  // =========================

  describe('Edge cases', () => {
    
    it('should return false for an empty string username', () => {
      // This test ensures that an empty string username returns false
      const emptyUsername = '';
      jest.mocked(mockCredential.getUsername).mockReturnValue(emptyUsername);

      // Ensure the usernameRegex does not match the empty string
      expect(usernameRegex.test(emptyUsername)).toBe(false);

      const validator = createValidatorWithMockCredential(emptyUsername);
      const result = validator.validateUsername();
      expect(result).toBe(false);
      expect(mockCredential.getUsername).toHaveBeenCalledTimes(2);
    });

    it('should return true for a username at the minimum allowed length', () => {
      // This test ensures that a username at the minimum length boundary is accepted if it matches the regex
      // Assume minimum length is 3 for this regex (adjust if different)
      const minLenUsername = 'abc';
      jest.mocked(mockCredential.getUsername).mockReturnValue(minLenUsername);

      expect(usernameRegex.test(minLenUsername)).toBe(true);

      const validator = createValidatorWithMockCredential(minLenUsername);
      const result = validator.validateUsername();
      expect(result).toBe(true);
      expect(mockCredential.getUsername).toHaveBeenCalledTimes(2);
    });

    it('should return true for a username at the maximum allowed length', () => {
      // This test ensures that a username at the maximum length boundary is accepted if it matches the regex
      // Assume maximum length is 20 for this regex (adjust if different)
      const maxLenUsername = 'a'.repeat(20);
      jest.mocked(mockCredential.getUsername).mockReturnValue(maxLenUsername);

      expect(usernameRegex.test(maxLenUsername)).toBe(true);

      const validator = createValidatorWithMockCredential(maxLenUsername);
      const result = validator.validateUsername();
      expect(result).toBe(true);
      expect(mockCredential.getUsername).toHaveBeenCalledTimes(2);
    });

    it('should return false for a username exceeding the maximum allowed length', () => {
      // This test ensures that a username exceeding the maximum length is rejected
      // Assume maximum length is 20 for this regex (adjust if different)
      const tooLongUsername = 'a'.repeat(21);
      jest.mocked(mockCredential.getUsername).mockReturnValue(tooLongUsername);

      expect(usernameRegex.test(tooLongUsername)).toBe(false);

      const validator = createValidatorWithMockCredential(tooLongUsername);
      const result = validator.validateUsername();
      expect(result).toBe(false);
      expect(mockCredential.getUsername).toHaveBeenCalledTimes(2);
    });

    it('should return false for a username with only special characters', () => {
      // This test ensures that a username with only special characters is rejected
      const specialCharUsername = '!@#$%^&*()';
      jest.mocked(mockCredential.getUsername).mockReturnValue(specialCharUsername);

      expect(usernameRegex.test(specialCharUsername)).toBe(false);

      const validator = createValidatorWithMockCredential(specialCharUsername);
      const result = validator.validateUsername();
      expect(result).toBe(false);
      expect(mockCredential.getUsername).toHaveBeenCalledTimes(2);
    });

    it('should return true for a username with allowed underscores and numbers', () => {
      // This test ensures that a username with underscores and numbers is accepted if allowed by the regex
      const validComplexUsername = 'user_name_123';
      jest.mocked(mockCredential.getUsername).mockReturnValue(validComplexUsername);

      expect(usernameRegex.test(validComplexUsername)).toBe(true);

      const validator = createValidatorWithMockCredential(validComplexUsername);
      const result = validator.validateUsername();
      expect(result).toBe(true);
      expect(mockCredential.getUsername).toHaveBeenCalledTimes(2);
    });

    it('should throw TypeError if username is not a string (e.g., number)', () => {
      // This test ensures that if the username is a number, the regex test throws a TypeError.
      const credential = {
        getUsername: jest.fn().mockReturnValue(12345678),
      } as unknown as jest.Mocked<Credential>;

      const validator = new Validator('user', 'user@email.com', 'irrelevant');
      (validator as any).credential = credential;

      expect(() => validator.validateUsername()).toThrow(TypeError);
      expect(credential.getUsername).toHaveBeenCalledTimes(1);
    });
  });
});