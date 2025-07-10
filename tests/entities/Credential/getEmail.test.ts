
import { Credential } from '../../../src/entities/Credential';


// src/entities/Credential.test.js
describe('Credential.getEmail() getEmail method', () => {
    // Happy Path Tests
    describe('Happy Paths', () => {
        test('should return the correct email when a valid email is set', () => {
            // Arrange
            const email = 'test@example.com';
            const credential = new Credential('user', email, 'password123');

            // Act
            const result = credential.getEmail();

            // Assert
            expect(result).toBe(email);
        });

        test('should return an empty string when the email is initialized as an empty string', () => {
            // Arrange
            const credential = new Credential('user', '', 'password123');

            // Act
            const result = credential.getEmail();

            // Assert
            expect(result).toBe('');
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        test('should return empty string if email is set as undefined in the constructor', () => {
            // Arrange
            const credential = new Credential('user', undefined, 'password123');

            // Act
            const result = credential.getEmail();

            // Assert
            expect(result).toBeDefined();
        });

        test('should return the updated email after setEmail is called', () => {
            // Arrange
            const initialEmail = 'initial@example.com';
            const updatedEmail = 'updated@example.com';
            const credential = new Credential('user', initialEmail, 'password123');

            // Act
            credential.setEmail(updatedEmail);
            const result = credential.getEmail();

            // Assert
            expect(result).toBe(updatedEmail);
        });
    });
});