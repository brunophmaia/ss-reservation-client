import { UserType } from '@/enums/user-type.enum';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDevice } from '@/context/device-context';
import styles from './login.module.scss';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';

export default function Login() {

  const { isMobile } = useDevice();
  const { t } = useTranslation();
  const [ type, setType ] = useState<UserType>();
  const router = useRouter();
  const { query } = router;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  useEffect(() => {
    if(router.isReady) {
      if(query.t == 'player') {
        setType(UserType.PLAYER);
      }
      else if (query.t == 'owner') {
        setType(UserType.OWNER);
      }
      else {
        router.push('/');
      }
    }
  }, [query]);

  const responseMessage = (response: any) => {
    console.log(jwtDecode(response.credential));
    
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };

  return (
    <div className='h100 w100 verticalCenter horizontalCenter'>
      <div className='w100'>
        <div className={`${isMobile ? 'p-l-16 p-r-16' : 'flex'}`}>

          {/* BEGIN GOOGLE LOGIN*/}
          <div className={`verticalCenter horizontalCenter ${isMobile ? '' : `${styles.w50p}`}`}>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage as any} />
          </div>
          {/* END GOOGLE LOGIN*/}
          
          {isMobile && <div className='p-t-32 p-b-32 horizontalCenter'>{t('login.or')}</div>}

          {/* BEGIN EMAIL LOGIN */}
          <div className={`${isMobile ? '' : styles.w50p}`}>
            <div className={`${isMobile ? '' : styles.w70p}`}>
              <div className='p-b-16'>{t('login.loginWithEmail')}</div>
              <div className='flex'><TextField className='w100 text-field-override' label={t('login.email')} variant="standard" /></div>
              <div className='flex p-t-8'>
                <FormControl className='w100 text-field-override' variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className='flex p-t-32 p-b-16'><Button className='w100' variant="contained">{t('login.login')}</Button></div>
              <div className='p-t-32'><a className={styles.createAnc} onClick={() => router.push('/create-account')}>{t('login.createAccount')}</a></div>
            </div>
            
          </div>
          {/* END EMAIL LOGIN */}
        </div>
      </div>
    </div>
  );
}
