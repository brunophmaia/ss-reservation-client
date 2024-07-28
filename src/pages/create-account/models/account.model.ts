export class Account {

    constructor (name: string,
                lastName: string,
                birthDate: string,
                gender: string,
                email: string,
                password: string,
                passwordConfirmation: string,
                phone: string
    ) {
        this.name = name;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
        this.phone = phone;
    }

    name!: string;
    lastName!: string;
    birthDate!: string | Date;
    gender!: string;
    email!: string;
    password!: string;
    passwordConfirmation!: string;
    phone!: string;
}