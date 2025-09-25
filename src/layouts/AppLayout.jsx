import { useLocation } from "react-router-dom";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { AppBar } from "../components/AppBar.jsx";
import HeaderBar from "../components/HeaderBar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useApp } from "../contexts/AppContext.jsx";

export function AppLayout({ children }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const location = useLocation();
    const { drawerOpen } = useApp();

    const menuItems = [
        { text: 'Dashboard', path: '/dashboard' },
        { text: 'Festividades', path: '/festividades' },
        { text: 'Equipamentos', path: '/equipamentos' },
        { text: 'Produtos', path: '/produtos' },
        { text: 'Relatórios', path: '/relatorios' },
        { text: 'Comunidades', path: '/comunidades' },
        { text: 'Usuários', path: '/usuarios' },
    ];

    const currentItem = menuItems.find(item => item.path === location.pathname);
    const title = currentItem ? currentItem.text : "Página";

    const drawerWidth = drawerOpen ? "260px" : "75px";

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar />
            <HeaderBar
                title={title}
                drawerWidth={drawerWidth}
            />
            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#f5f5f5',
                    minHeight: '100vh',
                    pt: 8,
                    ml: isMobile ? 0 : drawerWidth,
                    transition: theme.transitions.create(['margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.standard,
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
