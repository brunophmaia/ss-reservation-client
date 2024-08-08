import { getBirthDateFromStr, getPhoneDigitsFromStr } from "../util/create-account.util";

export class Account {

    constructor (name: string,
                 lastName: string,
                 birthDate: string,
                 gender: string,
                 email: string,
                 password: string,
                 phone: string,
                 emailCode: string
    ) {
        this.name = name.trim();
        this.lastName = lastName.trim();
        this.birthDate = getBirthDateFromStr(birthDate);
        this.gender = gender;
        this.email = email.trim();
        this.password = password.trim();
        this.phone = getPhoneDigitsFromStr(phone);
        this.emailCode = emailCode.trim();
    }

    name!: string;
    lastName!: string;
    birthDate!: Date;
    gender!: string;
    email!: string;
    password!: string;
    phone!: string;
    emailCode!: string;
}