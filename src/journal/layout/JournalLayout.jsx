import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../components'



const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
    return (

        <Box
            className='animated__animated animate_fadeIn animate_faster'
            sx={{ display: 'flex' }}
        >

            <NavBar drawerWidth={drawerWidth} />

            <SideBar drawerWidth={drawerWidth} />

            <Box
                component="main"
                sx={{ flexGrow: 1, padding: 1 }}
            >

                <Toolbar 
                    
                />

                {children}

            </Box>
        </Box>
    )
}
