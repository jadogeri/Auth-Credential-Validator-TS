
import { Credential } from '../../../src/entities/Credential';


// Import the Credential class
describe('Credential.setEmail() setEmail method', () => {
    // Happy Path Tests
    describe('Happy Path', () => {
        test('should set the email correctly when a valid email is provided', () => {
            // Arrange: Create a Credential instance
            const credential = new Credential('user1', 'oldemail@example.com', 'password123');
            
            // Act: Set a new email
            credential.setEmail('newemail@example.com');
            
            // Assert: Check if the email was updated correctly
            expect(credential.getEmail()).toBe('newemail@example.com');
        });

        test('should overwrite the existing email with a new valid email', () => {
            // Arrange: Create a Credential instance with an initial email
            const credential = new Credential('user2', 'initial@example.com', 'password123');
            
            // Act: Set a new email
            credential.setEmail('updated@example.com');
            
            // Assert: Verify the email has been updated
            expect(credential.getEmail()).toBe('updated@example.com');
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        test('should set the email to an empty string if an empty string is provided', () => {
            // Arrange: Create a Credential instance with an initial email
            const credential = new Credential('user3', 'email@example.com', 'password123');
            
            // Act: Set the email to an empty string
            credential.setEmail('');
            
            // Assert: Verify the email is now an empty string
            expect(credential.getEmail()).toBe('');
        });

        test('should set the email to a string with special characters', () => {
            // Arrange: Create a Credential instance
            const credential = new Credential('user4', 'email@example.com', 'password123');
            
            // Act: Set the email to a string with special characters
            credential.setEmail('special!@#email.com');
            
            // Assert: Verify the email is set correctly
            expect(credential.getEmail()).toBe('special!@#email.com');
        });

        test('should handle setting the email to a string with spaces', () => {
            // Arrange: Create a Credential instance
            const credential = new Credential('user5', 'email@example.com', 'password123');
            
            // Act: Set the email to a string with spaces
            credential.setEmail('email with spaces@example.com');
            
            // Assert: Verify the email is set correctly
            expect(credential.getEmail()).toBe('email with spaces@example.com');
        });

        test('should handle setting the email to a very long string', () => {
            // Arrange: Create a Credential instance
            const credential = new Credential('user6', 'email@example.com', 'password123');
            const longEmail = 'a'.repeat(1000) + '@example.com';
            
            // Act: Set the email to a very long string
            credential.setEmail(longEmail);
            
            // Assert: Verify the email is set correctly
            expect(credential.getEmail()).toBe(longEmail);
        });
    });
});