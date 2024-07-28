import { FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput  } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PasswordTextField({ onInputChange, id }: any) {

    const { t } = useTranslation();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        if(onInputChange){
            onInputChange(event.target.value);
        }
    };

    return (
        <FormControl required className='w100 text-field-override'>
            <InputLabel htmlFor={id}>{t('common.password')}</InputLabel>
            <OutlinedInput
                id={id}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                label={t('login.password')}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            />
        </FormControl>
    );
}