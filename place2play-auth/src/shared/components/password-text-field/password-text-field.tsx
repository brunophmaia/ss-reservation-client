import { FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput, FormHelperText  } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PasswordTextFiled.module.scss';

export default function PasswordTextField({ onInputChange, id, helperMessage, label, showHelper }: any) {

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
            <InputLabel htmlFor={id}>{label ? label : t('common.password')}</InputLabel>
            <OutlinedInput
                id={id}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                label={label ? label : t('common.password')}
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
            {showHelper && (
                <FormHelperText className={styles.marginHelper} error>
                {helperMessage}
                </FormHelperText>
            )}
        </FormControl>
    );
}