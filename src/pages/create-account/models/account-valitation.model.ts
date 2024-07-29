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
    
    constructor() {
        super();
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
    
    constructor() {
        super();
    }
}

class PhoneForm extends FormValidation {
    
    constructor() {
        super();
    }
}