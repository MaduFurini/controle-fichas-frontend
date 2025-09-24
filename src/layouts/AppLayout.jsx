import React from 'react';
import {
    Box,
    Container,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { AppBar } from "../components/AppBar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useApp } from "../contexts/AppContext.jsx";

const drawerWidth = '100vw';

export function AppLayout({ children }) {
    const { drawerOpen } = useApp();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar />
            <Sidebar />

            {/* Conteúdo Principal */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#f5f5f5',
                    minHeight: '100vh',
                    pt: 8, // Espaço para o AppBar
                    transition: theme.transitions.create(['margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    ...(!isMobile && drawerOpen && {
                        ml: `${drawerWidth}px`,
                        transition: theme.transitions.create(['margin'], {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    }),
                    ...(!isMobile && !drawerOpen && {
                        ml: 0, // Sem margem quando fechado no desktop
                    }),
                }}
            >
                <Container maxWidth={false} sx={{ maxWidth: 1920, py: 3 }}>
                    {children}
                </Container>
            </Box>
        </Box>
    );
}