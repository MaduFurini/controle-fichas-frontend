import { useLocation } from "react-router-dom";
import {Container, useTheme, Box, useMediaQuery} from "@mui/material";
import { AppBar } from "../components/AppBar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useApp } from "../contexts/AppContext.jsx";

export function AppLayout({ children }) {
    const { drawerOpen } = useApp();
    const theme = useTheme();
    const location = useLocation();

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

    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

    const drawerWidthOpen = 400;
    const drawerWidthClosed = 100;

    const currentDrawerWidth = isMobile ? '100%' : drawerOpen ? drawerWidthOpen : drawerWidthClosed;

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,

                    marginLeft: {
                        xs: 0,
                        lg: `${currentDrawerWidth}px`
                    },
                    mt: { xs: 7, md: 9 },
                    px: { xs: 2, md: 3 },
                    pb: 3,
                    width: {
                        xs: '100%',
                        lg: `calc(100% - ${currentDrawerWidth}px)`
                    },
                    maxWidth: "none",
                    transition: theme.transitions.create(["margin-left", "width"], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    backgroundColor: "#F5F5F5",
                }}
            >
                <AppBar drawerWidth={`${currentDrawerWidth}px`} title={title} />

                {children}
            </Box>
        </Container>
    );
}