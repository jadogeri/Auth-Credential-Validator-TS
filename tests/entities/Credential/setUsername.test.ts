
import { Credential } from '../../../src/entities/Credential';


// src/entities/Credential.test.js
describe('Credential.setUsername() setUsername method', () => {
    // Happy Path Tests
    describe('Happy Paths', () => {
        test('should set the username correctly when a valid string is provided', () => {
            // Arrange
            const credential = new Credential('oldUsername', 'email@example.com', 'password123');
            const newUsername = 'newUsername';

            // Act
            credential.setUsername(newUsername);

            // Assert
            expect(credential.getUsername()).toBe(newUsername);
        });

        test('should update the username when it is changed multiple times', () => {
            // Arrange
            const credential = new Credential('initialUsername', 'email@example.com', 'password123');
            const firstUpdate = 'firstUpdate';
            const secondUpdate = 'secondUpdate';

            // Act
            credential.setUsername(firstUpdate);
            credential.setUsername(secondUpdate);

            // Assert
            expect(credential.getUsername()).toBe(secondUpdate);
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        test('should set the username to an empty string if provided', () => {
            // Arrange
            const credential = new Credential('nonEmptyUsername', 'email@example.com', 'password123');
            const newUsername = '';

            // Act
            credential.setUsername(newUsername);

            // Assert
            expect(credential.getUsername()).toBe(newUsername);
        });

        test('should handle setting the username to a string with special characters', () => {
            // Arrange
            const credential = new Credential('normalUsername', 'email@example.com', 'password123');
            const specialCharUsername = '!@#$%^&*()_+';

            // Act
            credential.setUsername(specialCharUsername);

            // Assert
            expect(credential.getUsername()).toBe(specialCharUsername);
        });

        test('should handle setting the username to a very long string', () => {
            // Arrange
            const credential = new Credential('shortUsername', 'email@example.com', 'password123');
            const longUsername = 'a'.repeat(1000); // 1000 characters long

            // Act
            credential.setUsername(longUsername);

            // Assert
            expect(credential.getUsername()).toBe(longUsername);
        });

        test('should handle setting the username to a string with spaces', () => {
            // Arrange
            const credential = new Credential('usernameWithoutSpaces', 'email@example.com', 'password123');
            const spacedUsername = 'user name with spaces';

            // Act
            credential.setUsername(spacedUsername);

            // Assert
            expect(credential.getUsername()).toBe(spacedUsername);
        });
    });
});