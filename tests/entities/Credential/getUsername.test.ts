
import { Credential } from '../../../src/entities/Credential';


// src/entities/Credential.test.js
describe('Credential.getUsername() getUsername method', () => {
    // Happy Path Tests
    describe('Happy Path', () => {
        test('should return the correct username when a valid username is set', () => {
            // Arrange: Create a Credential instance with a valid username
            const username = 'johndoe';
            const credential = new Credential(username, 'john@example.com', 'password123');

            // Act: Retrieve the username using getUsername
            const result = credential.getUsername();

            // Assert: The result should match the username set during instantiation
            expect(result).toBe(username);
        });

        test('should return an empty string when the username is set to an empty string', () => {
            // Arrange: Create a Credential instance with an empty username
            const credential = new Credential('', 'john@example.com', 'password123');

            // Act: Retrieve the username using getUsername
            const result = credential.getUsername();

            // Assert: The result should be an empty string
            expect(result).toBe('');
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        test('should return the correct username when the username contains special characters', () => {
            // Arrange: Create a Credential instance with a username containing special characters
            const username = 'john_doe!@#';
            const credential = new Credential(username, 'john@example.com', 'password123');

            // Act: Retrieve the username using getUsername
            const result = credential.getUsername();

            // Assert: The result should match the username with special characters
            expect(result).toBe(username);
        });

        test('should return the correct username when the username is a single character', () => {
            // Arrange: Create a Credential instance with a single character username
            const username = 'a';
            const credential = new Credential(username, 'john@example.com', 'password123');

            // Act: Retrieve the username using getUsername
            const result = credential.getUsername();

            // Assert: The result should match the single character username
            expect(result).toBe(username);
        });

        test('should return the correct username when the username is a very long string', () => {
            // Arrange: Create a Credential instance with a very long username
            const username = 'a'.repeat(1000); // 1000 characters long
            const credential = new Credential(username, 'john@example.com', 'password123');

            // Act: Retrieve the username using getUsername
            const result = credential.getUsername();

            // Assert: The result should match the very long username
            expect(result).toBe(username);
        });
    });
});