import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect } from 'react';
import { UserInfo } from '@/shared/models/user-info.model';
import styles from './index.module.scss';
import { HomeService } from './home/service/home.service';
import AppBarComponent from './home/components/app-bar/app-bar';
import SideNav from './home/components/side-nav/side-nav';

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