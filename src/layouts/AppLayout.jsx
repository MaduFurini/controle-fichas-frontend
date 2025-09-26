import { useLocation } from "react-router-dom";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { AppBar } from "../components/AppBar.jsx";
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

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                boxSizing: "border-box",
            }}
        >
            <AppBar title={title} />
            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#f5f5f5',
                    minHeight: '100vh',
                    minWidth: '100%',
                    pt: 8,
                    pl: 4,
                    transition: theme.transitions.create(['margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.standard,
                    }),
                }}
            >
                <Container maxWidth>
                    {children}
                </Container>
            </Box>
        </Box>
    );
}
