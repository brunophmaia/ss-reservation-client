import { useState } from "react";

export class AccountForm {

    constructor(){}

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

    validate(){

        this.fields.forEach(field => {
            field.validation();
        });

        this.chechMatchPassword();
    }

    chechMatchPassword(){
        if(this.password.value && this.passwordConfirmation.value && this.password.value != this.passwordConfirmation.value) {
            this.passwordConfirmation.setMissmatch(true);
        } else {
            this.passwordConfirmation.setMissmatch(false);
        }
    }
}

class FormValidation {

    value: any;
    valid!: boolean;
    _setValue: any;
    setValid: any;

    constructor(){
        const [value, setValue] = useState<any>('');
        const [valid, _setValid] = useState<boolean>(true);

        this.value = value;
        this._setValue = setValue;
        this.valid = valid;
        this.setValid = _setValid;
    }

    setValue(value: any){
        this._setValue(value);
        this.setValid(!!value);
    }

    validation(){
        this.setValid(!!this.value);
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
        const [showValidBirthDate, setShowValidBirthDate] = useState<boolean>(false);
        this.showValidBirthDate = showValidBirthDate;
        this.setShowValidBirthDate = setShowValidBirthDate;
    }


    validation() {
        if(this.value) {
            const dateSplitted = (this.value as string).split('/');
            const date = new Date(`${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}`);

            if(date.toString() == 'Invalid Date') {
                this.setShowValidBirthDate(true);
                this.setValid(false);
            }
        }
        else {
            this.setValid(false);
        }
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
    
    constructor() {
        super();
    }
}

class PasswordConfirmationForm extends FormValidation {
    
    showMissmatch: any;
    setShowMissmatch: any;

    constructor() {
        super();
        const [showMissmatch, setShowMissmatch] = useState<boolean>(false);
        this.showMissmatch = showMissmatch;
        this.setShowMissmatch = setShowMissmatch;
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
        const [showValidPhone, setShowValidPhone] = useState<boolean>(false);
        this.showValidPhone = showValidPhone;
        this.setShowValidPhone = setShowValidPhone;
    }

    validation() {
        if(this.value) {
            const phoneDigits = (this.value as string).replaceAll('(','')
                                                        .replaceAll(')','')
                                                        .replaceAll('-','')
                                                        .replaceAll(' ','');
            
            if((phoneDigits.length != 10 && phoneDigits.length != 11) || !(/^\d+$/.test(phoneDigits))) {
                this.setShowValidPhone(true);
                this.setValid(false);
            }
        }
        else {
            this.setValid(false);
        }
    }
}