import { TextField  } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function EmailTextField({ onInputChange }: any) {

    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
  
    const handleEmailChange = (e: any) => {
      setEmail(e.target.value);
      setEmailError(!e.target.validity.valid);
      if(onInputChange){
            onInputChange(e.target.value);
        }
    };

    return (
        <TextField 
            className='w100 text-field-override'
            required
            label={t('common.email')}
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? t('login.validEmail') : ""}
            inputProps={{
                type: "email",
            }}
            variant="outlined" />
    );
}