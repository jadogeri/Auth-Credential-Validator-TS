/**
 * @author      Joseph Adogeri
 * @since       12-JUL-2025
 * @version     1.0.3
 * @description class to represent Credential
 *  
 */

export class Credential {
    private username: string;
    private email: string;
    private password: string;

    /**
     * constructor to create new instance of Credential.
     * @param {string} username - The username of a credential.
     * @param {string} email - The email address of a credential.
     * @param {string} password - The password of a credential.
     */    
    constructor(username: string, email: string , password: string ) {
        
        this.username = username;
        this.email = email;
        this.password = password;
    }

    /**
     * Retrieves the email address associated with the instance.
     * @returns {string} The email address.
     * @throws {Error} Throws an error if the email is not set.
     */
    getEmail(): string {
        return this.email;
    }

    /**
     * Retrieves the username of the current instance.
     * @returns The username as a string.
     * @throws No exceptions are thrown.
     */
    getUsername(): string  {
        return this.username;
    }

    /**
     * Retrieves the password of the current instance.
     * @returns The password as a string.
     * @throws No exceptions are thrown.
     */
    getPassword(): string {
        return this.password ;
    }

    /**
     * Sets the email address for the instance.
     * @param email - A string representing the email address to be set.
     * @returns void
     * @throws Error if the email format is invalid.
     */
    setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Sets the username for the instance.
     * @param username - A string representing the username to be set.
     * @returns void
     * @throws Error if the username format is invalid.
     */
    setUsername(username: string): void {
        
        this.username = username;
    }

    /**
     * Sets the password for the instance.
     * @param password - A string representing the password to be set.
     * @returns void
     * @throws Error if the password format is invalid.
     */
    setPassword(password: string): void {

        this.password = password;
    }
}