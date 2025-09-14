export class Login {

    constructor(username: string, password: string, loginType: string) {
        this.username = username;
        this.password = password;
        this.loginType = loginType;
    }

    username!: string;
    password!: string;
    loginType!: string;
}