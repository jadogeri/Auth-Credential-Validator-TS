
import { Credential } from "../../../src/entities/Credential";
import { Validator } from '../../../src/entities/Validator';


// Mocks for regex (not directly used in getCredential, but required for Validator instantiation)
jest.mock("../../../src/data/regex", () => ({
  usernameRegex: /^[a-zA-Z0-9_]{3,16}$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^.{6,}$/,
}));

// Manual mock for Credential class
const mockCredential = {
  getUsername: jest.fn(),
  getEmail: jest.fn(),
  getPassword: jest.fn(),
} as unknown as jest.Mocked<Credential>;

describe('Validator.getCredential() getCredential method', () => {
  // Happy Path Tests
  describe('Happy paths', () => {
    test('should return the Credential instance that was set in the constructor', () => {
      // This test ensures getCredential returns the Credential instance created in the constructor.
      const username = 'testuser';
      const email = 'test@example.com';
      const password = 'securePass123';

      // Spy on the Credential constructor to return our mockCredential
      const credentialConstructorSpy = jest
        .spyOn(require('../../../src/entities/Credential'), 'Credential')
        .mockImplementation(() => mockCredential);

      const validator = new Validator(username, email, password);

      // getCredential should return the Credential instance (mockCredential)
      expect(validator.getCredential()).toBe(mockCredential);

      credentialConstructorSpy.mockRestore();
    });

    test('should return a Credential object with correct properties', () => {
      // This test ensures the returned Credential object has the expected properties.
      const username = 'alice';
      const email = 'alice@example.com';
      const password = 'password123';

      // Create a real Credential instance for this test
      const realCredential = new Credential(username, email, password);

      // Spy on the Credential constructor to return the realCredential
      const credentialConstructorSpy = jest
        .spyOn(require('../../../src/entities/Credential'), 'Credential')
        .mockImplementation(() => realCredential);

      const validator = new Validator(username, email, password);

      const credential = validator.getCredential();
      expect(credential.getUsername()).toBe(username);
      expect(credential.getEmail()).toBe(email);
      expect(credential.getPassword()).toBe(password);

      credentialConstructorSpy.mockRestore();
    });
  });

  // Edge Case Tests
  describe('Edge cases', () => {
    test('should return the Credential instance even if username, email, and password are empty strings', () => {
      // This test checks that getCredential still returns a Credential object when empty strings are provided.
      const username = '';
      const email = '';
      const password = '';

      // Create a real Credential instance for this test
      const realCredential = new Credential(username, email, password);

      // Spy on the Credential constructor to return the realCredential
      const credentialConstructorSpy = jest
        .spyOn(require('../../../src/entities/Credential'), 'Credential')
        .mockImplementation(() => realCredential);

      const validator = new Validator(username, email, password);

      const credential = validator.getCredential();
      expect(credential.getUsername()).toBe('');
      expect(credential.getEmail()).toBe('');
      expect(credential.getPassword()).toBe('');

      credentialConstructorSpy.mockRestore();
    });

    test('should return the Credential instance when username, email, and password contain special characters', () => {
      // This test checks that getCredential works with special characters in the input.
      const username = 'user!@#';
      const email = 'user+test@example-domain.com';
      const password = 'p@$$w0rd!';

      // Create a real Credential instance for this test
      const realCredential = new Credential(username, email, password);

      // Spy on the Credential constructor to return the realCredential
      const credentialConstructorSpy = jest
        .spyOn(require('../../../src/entities/Credential'), 'Credential')
        .mockImplementation(() => realCredential);

      const validator = new Validator(username, email, password);

      const credential = validator.getCredential();
      expect(credential.getUsername()).toBe(username);
      expect(credential.getEmail()).toBe(email);
      expect(credential.getPassword()).toBe(password);

      credentialConstructorSpy.mockRestore();
    });

    test('should always return the same Credential instance for multiple calls', () => {
      // This test ensures getCredential returns the same object reference on repeated calls.
      const username = 'repeatuser';
      const email = 'repeat@example.com';
      const password = 'repeatPass';

      // Create a real Credential instance for this test
      const realCredential = new Credential(username, email, password);

      // Spy on the Credential constructor to return the realCredential
      const credentialConstructorSpy = jest
        .spyOn(require('../../../src/entities/Credential'), 'Credential')
        .mockImplementation(() => realCredential);

      const validator = new Validator(username, email, password);

      const firstCall = validator.getCredential();
      const secondCall = validator.getCredential();
      expect(firstCall).toBe(secondCall);

      credentialConstructorSpy.mockRestore();
    });
  });
});