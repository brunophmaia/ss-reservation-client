import { TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function EmailCodeConfirmation({ email, onInputCode }: any) {

    const { t } = useTranslation();

    const [code, setCode] = useState('');

    const onChangeInput = (value: string) => {
        setCode(value);
        onInputCode(value);
    };

    return (
        <div>
            <div className='p-b-32'>{t('common.sentCodeEmail', { email })}</div>
            <div className='flex'>
                <TextField 
                    className='w100 text-field-override'
                    required
                    label={t('common.code')}
                    variant="outlined"
                    value={code}
                    onChange={e => onChangeInput(e.target.value)}/>
            </div>
        </div>
    );
}