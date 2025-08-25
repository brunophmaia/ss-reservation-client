import Box from '@mui/material/Box';
import { SideNavProps } from './models/side-nav-props.model';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useDevice } from '@/context/device-context';
import { useRouter } from 'next/router';
import { LoginService } from '@/shared/services/login/login.service';
import { logout } from '@/shared/services/login/login.util';

export default function SideNav({userInfo}: SideNavProps) {
    const router = useRouter();
    const { isMobile } = useDevice();
    const loginService = new LoginService();

    const handleLogout = () => {
        logout(router, loginService);
    };

    return <Box className='p-l-16 p-r-16 p-t-16 p-b-16'>
                <div className='flex'>
                    <div>
                        <div className='flex verticalCenter'>
                            <AccountCircleIcon />
                            <div className='p-l-8'>{userInfo?.name}</div>
                        </div>
                        <div className='p-t-8'>{userInfo?.email}</div>
                    </div>
                    {isMobile && <div className='m-l-32'>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleLogout}
                            color="inherit"
                        >
                            <ExitToApp />
                        </IconButton>
                    </div>}
                </div>
           </Box>;
}
