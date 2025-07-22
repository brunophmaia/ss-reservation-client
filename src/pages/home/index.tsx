import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SideNav from './components/side-nav/side-nav';
import { useEffect } from 'react';
import { HomeService } from './service/home.service';
import { Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LoginService } from '../login/service/login.service';
import { useRouter } from 'next/router';
import { useDevice } from '@/context/device-context';
import { UserInfo } from '@/shared/models/user-info.model';
import { logout } from '@/shared/services/login/login.util';

export default function Home() {

    const appName = process.env.NEXT_PUBLIC_APP_NAME;
    const router = useRouter();
    const homeService = new HomeService();
    const loginService = new LoginService();
    const [openSideNav, setOpenSideNav] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState<UserInfo>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();
    const { isMobile } = useDevice();

    const handleSideNav = () => {
        setOpenSideNav(!openSideNav);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout(router, loginService);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenSideNav(newOpen);
    };

    useEffect(() => {
        homeService.getUserInfo().then((user: UserInfo) => {
            setUserInfo(user);
        });
    }, []);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleSideNav}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {appName}
                </Typography>
                { !isMobile && <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                     <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>{t('login.logout')}</MenuItem>
                    </Menu>
                </div>}
                </Toolbar>
            </AppBar>
            <Drawer open={openSideNav} onClose={toggleDrawer(false)}>
                <SideNav userInfo={userInfo}></SideNav>
            </Drawer>
        </Box>
        
    );
}