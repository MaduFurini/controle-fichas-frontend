import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
    styled,
    Tooltip,
    Grid, Stack, ListSubheader, IconButton, Toolbar
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {
    Computer,
    Event,
    Devices,
    Inventory,
    Assessment,
    Church,
    Person, Favorite, Dashboard, Close
} from '@mui/icons-material';
import { useApp } from "../contexts/AppContext.jsx";
import LogoParoquia from "../assets/images/logo_paroquia.png";
import {useNavigate} from "react-router-dom";

const openedMixin = (theme, isXlScreen) => ({
    width: '16%',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const PermanentDrawer = styled(Drawer)(
    ({ open, theme }) => ({
        width: open ? 400 : 100,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
            width: open ? 400 : 100,
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    })
);

const menuItems = [
    { text: 'Festividades', icon: <Event sx={{ fontSize: 21 }} />, path: '/festividades' },
    { text: 'Equipamentos', icon: <Devices sx={{ fontSize: 21 }} />, path: '/equipamentos' },
    { text: 'Produtos', icon: <Inventory sx={{ fontSize: 21 }} />, path: '/produtos' },
    { text: 'Relatórios', icon: <Assessment sx={{ fontSize: 21 }} />, path: '/relatorios' }
];

const managementItems = [
    { text: 'Comunidades', icon: <Church sx={{ fontSize: 21 }} />, path: '/comunidades' },
    { text: 'Usuários', icon: <Person sx={{ fontSize: 21 }} />, path: '/usuarios' }
];

export default function Sidebar() {
    const { drawerOpen, userData, handleCloseDrawer } = useApp();
    const { setTitle } = useApp();

    const [currentPath, setCurrentPath] = useState('/festividades');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const isXlScreen = useMediaQuery(theme => theme.breakpoints.up("xl"));
    const isXXlScreen = useMediaQuery('(min-width:1921px)');

    const navigate = useNavigate();

    const handleMenuClick = (path, title) => {
        setCurrentPath(path);
        setTitle(title);
        navigate(path);
        if (isMobile) handleCloseDrawer();
    };

    useEffect(() => {
        if (isMobile) handleCloseDrawer(true);
        else handleCloseDrawer(false);
    }, [isMobile]);

    const menu = () => {
        return (
            <>
                <List
                    sx={{
                        overflowX: 'hidden',
                        paddingTop: 1,
                        width: '100%',
                        minHeight: isXXlScreen ? '100vh' : 'auto',
                        height: {
                            md: "100%"
                        },
                        bgcolor: 'background.paper',
                        boxShadow: {
                            xs: 0,
                            lg: 2
                        }
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    disablePadding
                    subheader={
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            spacing={2}
                        >
                            <ListSubheader style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                Olá User
                            </ListSubheader>
                            <IconButton
                                onClick={handleCloseDrawer}
                                sx={{
                                    display: {
                                        xs: 'block',
                                        lg: 'none'
                                    },
                                    color: 'inherit'
                                }}
                            >
                                <Close />
                            </IconButton>
                        </Stack>
                    }
                >

                </List>
            </>
        )
    }

    return (
        <>
            {
                isMobile ?
                    (
                        <Drawer
                            variant='temporary'
                            anchor='left'
                            open={drawerOpen}
                            onClose={handleCloseDrawer}
                            sx={{
                                '& .MuiDrawer-paper': {
                                    width: '100vw', // 🔹 Ocupa a tela inteira no mobile
                                    maxWidth: '100%',
                                    height: '100vh'
                                }
                            }}
                        >
                            {menu()}
                        </Drawer>
                    ) : (
                        <PermanentDrawer
                            variant='permanent'
                            anchor='left'
                            open={drawerOpen}
                            onClose={handleCloseDrawer}
                        >
                            <Toolbar />
                            {menu()}
                        </PermanentDrawer>
                    )
            }
        </>
    );
}