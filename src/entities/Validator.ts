/**
 * @author      Joseph Adogeri
 * @since       10-JUL-2025
 * @version     1.0.0
 * @description class to validate user credentials
 *  
 */
import { usernameRegex, emailRegex, passwordRegex } from "../data/regex";
import { Credential } from "./Credential";
export class Validator {
    private credential :Credential;
    private usernameRegex: RegExp;
    private emailRegex: RegExp;
    private passwordRegex: RegExp;

    /**
     * constructor to create new instance of Validator.
     * @param {string} username - The username of a credential.
     * @param {string} email - The email address of a credential.
     * @param {string} password - The password of a credential.
     */    
       constructor(username : string, email : string, password : string){
        this.credential = new Credential(username,email,password);
        this.usernameRegex = usernameRegex;
        this.emailRegex = emailRegex;
        this.passwordRegex = passwordRegex;
    }
   
     /**
     * Validates the username against a predefined regex pattern.
     * @returns {boolean} True if the username is valid, false otherwise.
     * @throws {TypeError} If the username is not a string.
     */    
    validateUsername(): boolean | null{
        if(typeof this.getCredential().getUsername() != "string"){
            throw new TypeError("username is not a string");
        }
        return this.usernameRegex.test(this.credential.getUsername())
    }

    /**
     * Validates the format of the email address retrieved from credentials.
     * @returns {boolean} True if the email format is valid, otherwise false.
     * @throws {TypeError} If credential or email is not defined.
     */
    validateEmail(): boolean | null{
        if(typeof this.getCredential().getEmail() != "string"){
            throw new TypeError("email is not a string");
        }
        return this.emailRegex.test(this.credential.getEmail())
    }

    /**
     * Validates the user's password against a predefined regex pattern.
     * @returns {boolean} True if the password matches the regex, false otherwise.
     * @throws {TypeError} If the password is not a string.
     */  
    validatePassword(): boolean | null{
        if(typeof this.getCredential().getPassword() != "string"){
            throw new TypeError("password is not a string");
        }
        return this.passwordRegex.test(this.credential.getPassword())
    }

    /**
     * Sets the email regex pattern for validation.
     * @param {RegExp} emailRegex - The regular expression to validate email addresses.
     * @returns {void} - This function does not return a value.
     * @throws {TypeError} - Throws an error if emailRegex is not a RegExp object.
     */    
    setEmailRegex(regex : RegExp): void{
        if((regex != null || regex != undefined) && !(Object.prototype.toString.call(regex) === '[object RegExp]')){
            throw new TypeError('Input must be a valid regexp');
        }
        
        if(regex == null || regex == undefined){
            this.emailRegex = emailRegex;
        }else{
            this.emailRegex = regex;
        }
    }

    /**
     * Sets the username regex pattern for validation.
     * @param {RegExp} usernameRegex - The regex pattern to validate usernames.
     * @returns {void} - This function does not return a value.
     * @throws {TypeError} - Throws if usernameRegex is not a RegExp object.
     */    
    setUsernameRegex(regex : RegExp): void{
        if((regex != null || regex != undefined) && !(Object.prototype.toString.call(regex) === '[object RegExp]')){
            throw new TypeError('Input must be a valid regexp');
        }
        
        if(regex == null || regex == undefined){
            this.usernameRegex = usernameRegex;
        }else{
            this.usernameRegex = regex;
        }
    }

    /**
     * Sets the password regex pattern for validation.
     * @param {RegExp} passwordRegex - The regex pattern to validate passwords.
     * @returns {void} - This function does not return a value.
     * @throws {TypeError} - Throws an error if passwordRegex is not a RegExp object.
     */    
    setPasswordRegex(regex : RegExp): void{
        if((regex != null || regex != undefined) && !(Object.prototype.toString.call(regex) === '[object RegExp]')){
            throw new TypeError('Input must be a valid regexp');
        }

        if(regex == null || regex == undefined){
            this.passwordRegex = passwordRegex;
        }else{
            this.passwordRegex = regex;
        }
    }

    /**
     * Retrieves the current credential stored in the object.
     * @returns {any} The credential associated with the object.
     * @throws {undefined} If the credential is not set, it returns undefined.
     */    
    getCredential(): any{
        return this.credential;
    }   

}
