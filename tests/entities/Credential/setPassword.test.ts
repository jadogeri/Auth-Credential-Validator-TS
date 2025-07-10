
import { Credential } from '../../../src/entities/Credential';


// src/entities/Credential.test.js
describe('Credential.setPassword() setPassword method', () => {
    // Happy Path Tests
    describe('Happy Paths', () => {
        test('should set the password correctly when a valid string is provided', () => {
            // Arrange
            const credential = new Credential('user1', 'user1@example.com', 'initialPassword');
            const newPassword = 'newSecurePassword123';

            // Act
            credential.setPassword(newPassword);

            // Assert
            expect(credential.getPassword()).toBe(newPassword);
        });

        test('should update the password when it is changed from a previous value', () => {
            // Arrange
            const credential = new Credential('user2', 'user2@example.com', 'oldPassword');
            const updatedPassword = 'updatedPassword456';

            // Act
            credential.setPassword(updatedPassword);

            // Assert
            expect(credential.getPassword()).toBe(updatedPassword);
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        test('should set the password to an empty string if an empty string is provided', () => {
            // Arrange
            const credential = new Credential('user3', 'user3@example.com', 'somePassword');
            const emptyPassword = '';

            // Act
            credential.setPassword(emptyPassword);

            // Assert
            expect(credential.getPassword()).toBe(emptyPassword);
        });

        test('should set the password to a string with special characters', () => {
            // Arrange
            const credential = new Credential('user4', 'user4@example.com', 'anotherPassword');
            const specialCharPassword = '!@#$%^&*()_+';

            // Act
            credential.setPassword(specialCharPassword);

            // Assert
            expect(credential.getPassword()).toBe(specialCharPassword);
        });

        test('should set the password to a very long string', () => {
            // Arrange
            const credential = new Credential('user5', 'user5@example.com', 'shortPassword');
            const longPassword = 'a'.repeat(1000); // 1000 characters long

            // Act
            credential.setPassword(longPassword);

            // Assert
            expect(credential.getPassword()).toBe(longPassword);
        });

        test('should handle setting the password to a string with spaces', () => {
            // Arrange
            const credential = new Credential('user6', 'user6@example.com', 'passwordWithNoSpaces');
            const spacedPassword = 'password with spaces';

            // Act
            credential.setPassword(spacedPassword);

            // Assert
            expect(credential.getPassword()).toBe(spacedPassword);
        });
    });
});