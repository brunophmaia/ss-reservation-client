import { useState } from "react";

export class ConfirmationCodeModel {

    showDialogEmailConfirmation;
    emailConfirmationEnabled;
    emailCode;

    setShowDialogEmailConfirmation;
    setEmailConfirmationEnabled;
    setEmailCode;

    constructor(){
        [this.showDialogEmailConfirmation, this.setShowDialogEmailConfirmation] = useState<boolean>(false);
        [this.emailConfirmationEnabled, this.setEmailConfirmationEnabled] = useState<boolean>(false);
        [this.emailCode, this.setEmailCode] = useState<string>('');
    }

    setCodeValue(value: string) {
        this.setEmailCode(value);
        this.setEmailConfirmationEnabled(!!value);
    }

    hideDialog(){
        this.setShowDialogEmailConfirmation(false);
        this.setCodeValue('');
    }
}