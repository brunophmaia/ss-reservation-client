import { useState } from "react";
import { getBirthDateFromStr, getPhoneDigitsFromStr, isNotNullOrEmpty } from "../util/create-account.util";

export class AccountForm {

    showCheckFields;
    setShowCheckFields;

    constructor(){
        [this.showCheckFields, this.setShowCheckFields] = useState<boolean>(false);
    }

    name = new NameForm();
    lastName = new LastNameForm();
    birthDate = new BirthDateForm();
    email = new EmailForm();
    gender = new GenderForm();
    password = new PasswordForm();
    passwordConfirmation = new PasswordConfirmationForm();
    phone = new PhoneForm();

    fields: Array<FormValidation> = [
        this.name,
        this.lastName,
        this.birthDate,
        this.email,
        this.gender,
        this.password,
        this.passwordConfirmation,
        this.phone
    ];

    validate(formValid: boolean): boolean{
        let valid: boolean = formValid;

        //default validations
        this.fields.forEach(field => {
            let fieldValid = field.validation();
            valid = !fieldValid ? false : valid;
        });

        //additional validations
        let fieldValid = this.chechMatchPassword();
        valid = !fieldValid ? false : valid;

        this.setShowCheckFields(!valid);

        return valid;
    }

    chechMatchPassword(){
        if(this.password.value && this.passwordConfirmation.value && this.password.value != this.passwordConfirmation.value) {
            this.passwordConfirmation.setMissmatch(true);
            return false;
        } else {
            this.passwordConfirmation.setMissmatch(false);
            return true;
        }
    }
}

class FormValidation {

    value: any;
    valid!: boolean;
    _setValue: any;
    setValid: any;

    constructor(){
        [this.value, this._setValue] = useState<any>('');
        [this.valid, this.setValid] = useState<boolean>(true);
    }

    setValue(value: any){
        this._setValue(value);
        this.setValid(isNotNullOrEmpty(value));
    }

    validation(): boolean{
        let valid = isNotNullOrEmpty(this.value);
        this.setValid(valid);
        return valid;
    }
}

class NameForm extends FormValidation {
    
    constructor() {
        super();
    }
}

class LastNameForm extends FormValidation {
    
    constructor() {
        super();
    }
}

class BirthDateForm extends FormValidation {
    
    showValidBirthDate: any;
    setShowValidBirthDate: any;

    constructor() {
        super();
        [this.showValidBirthDate, this.setShowValidBirthDate] = useState<boolean>(false);
    }


    validation(): boolean {
        let valid = true;

        if(isNotNullOrEmpty(this.value)) {

            if(getBirthDateFromStr(this.value).toString() == 'Invalid Date') {
                this.setShowValidBirthDate(true);
                valid = false;
            }
        }
        else {
            valid = false;
        }

        this.setValid(valid);
        return valid;
    }
}

class GenderForm extends FormValidation {
    
    constructor() {
        super();
    }
}

class EmailForm extends FormValidation {
    
    constructor() {
        super();
    }
}

class PasswordForm extends FormValidation {
    
    showConditionPswd;
    setShowConditionPswd;

    constructor() {
        super();
        [this.showConditionPswd, this.setShowConditionPswd] = useState<boolean>(false);
    }

    validation(): boolean {
        let valid = true;

        if(isNotNullOrEmpty(this.value)) {
            const regexPswd = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_-])[A-Za-z\d!@#$%^&*(),.?":{}|<>_-]{8,}$/;

            if(!regexPswd.test(this.value)) {
                this.setShowConditionPswd(true);
                valid = false;
            }
        }
        else {
            valid = false;
        }

        this.setValid(valid);
        return valid;
    }
}

class PasswordConfirmationForm extends FormValidation {
    
    showMissmatch: any;
    setShowMissmatch: any;

    constructor() {
        super();
        [this.showMissmatch, this.setShowMissmatch] = useState<boolean>(false);
    }

    setMissmatch(missMatch: boolean) {
        this.setShowMissmatch(missMatch);
        if(missMatch) {
            this.setValid(false);
        }
    }
}

class PhoneForm extends FormValidation {
    
    showValidPhone: any;
    setShowValidPhone: any;

    constructor() {
        super();
        [this.showValidPhone, this.setShowValidPhone] = useState<boolean>(false);
    }

    validation(): boolean {
        let valid = true;

        if(isNotNullOrEmpty(this.value)) {
            const phoneDigits = getPhoneDigitsFromStr(this.value);
            
            if((phoneDigits.length != 10 && phoneDigits.length != 11) || !(/^\d+$/.test(phoneDigits))) {
                this.setShowValidPhone(true);
                valid = false;
            }
        }
        else {
            valid = false;
        }

        this.setValid(valid)
        return valid;
    }
}