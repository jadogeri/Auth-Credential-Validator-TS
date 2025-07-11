export class Credential {
    username: string;
    email: string;
    password: string;

    constructor(username: string , email: string, password: string );


    constructor(username: string = "", email: string = "", password: string = "") {
        
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
        if (email === undefined || email === null) {
            this.email = "";
        } else {
            this.email = email;
        }
    }

    setUsername(username: string): void {
        if (username === undefined || username === null) {
            this.username = "";
        } else {
            this.username = username;
        }
    }

    setPassword(password: string): void {
        if (password === undefined || password === null) {
            this.password = "";
        } else {
            this.password = password;
        }
    }
}