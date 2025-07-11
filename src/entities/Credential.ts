export class Credential {
    private username: string;
    private email: string;
    private password: string;

    constructor(username: string, email: string , password: string ) {
        
        this.username = username;
        this.email = email;
        this.password = password;
    }

    getEmail(): string {
        return this.email;
    }

    getUsername(): string  {
        return this.username;
    }

    getPassword(): string {
        return this.password ;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setUsername(username: string): void {
        
        this.username = username;
    }

    setPassword(password: string): void {

        this.password = password;
    }
}