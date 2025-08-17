import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SideNav from './components/side-nav/side-nav';
import { useEffect } from 'react';
import { HomeService } from './service/home.service';
import { UserInfo } from '@/shared/models/user-info.model';
import styles from './Home.module.scss';
import AppBarComponent from './components/app-bar/app-bar';

export default function Home() {
    
    const homeService = new HomeService();
    
    const [userInfo, setUserInfo] = React.useState<UserInfo>();
    const [openSideNav, setOpenSideNav] = React.useState(false);

    const handleSideNav = () => {
        setOpenSideNav(!openSideNav);
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
            <AppBarComponent handleSideNav={handleSideNav}/>
            <Drawer 
                open={openSideNav} 
                onClose={toggleDrawer(false)}
                classes={{
                    paper: styles.customPaper
                }}
            >
                <SideNav userInfo={userInfo}></SideNav>
            </Drawer>
        </Box>

    );
}