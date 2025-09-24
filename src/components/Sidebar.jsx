import {
    Box,
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
    Tooltip
} from "@mui/material";
import React, {useState} from "react";
import {
    Computer,
    Event,
    Devices,
    Inventory,
    Assessment,
    Church,
    Person, Favorite
} from '@mui/icons-material';
import { useApp } from "../contexts/AppContext.jsx";
import LogoParoquia from "../assets/images/logo_paroquia.png";

const drawerWidthOpen = 360;
const drawerWidthClosed = 80;

const StyledDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: open ? drawerWidthOpen : drawerWidthClosed,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    '& .MuiDrawer-paper': {
        width: open ? drawerWidthOpen : drawerWidthClosed,
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
        borderRight: 'none',
        boxShadow: '4px 0 6px -2px rgba(0,0,0,0.3)',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    },
}));

const menuItems = [
    { text: 'Dashboard', icon: <Computer sx={{ fontSize: 32 }} />, path: '/dashboard' },
    { text: 'Festividades', icon: <Event sx={{ fontSize: 32 }} />, path: '/festividades' },
    { text: 'Equipamentos', icon: <Devices sx={{ fontSize: 32 }} />, path: '/equipamentos' },
    { text: 'Produtos', icon: <Inventory sx={{ fontSize: 32 }} />, path: '/produtos' },
    { text: 'Relatórios', icon: <Assessment sx={{ fontSize: 32 }} />, path: '/relatorios' }
];

const managementItems = [
    { text: 'Comunidades', icon: <Church sx={{ fontSize: 32 }} />, path: '/comunidades' },
    { text: 'Usuários', icon: <Person sx={{ fontSize: 32 }} />, path: '/usuarios' }
];

export default function Sidebar() {
    const { drawerOpen, userData, handleCloseDrawer } = useApp();
    const [currentPath, setCurrentPath] = useState('/festividades');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleMenuClick = (path) => {
        setCurrentPath(path);
        if (isMobile) handleCloseDrawer();
    };

    const mobileDrawer = (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Seção Página Inicial no mobile */}
            <List sx={{ pt: 1, pb: 0 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <Tooltip title={item.text} placement="left" arrow>
                            <ListItemButton
                                onClick={() => handleMenuClick(item.path)}
                                selected={currentPath === item.path}
                                sx={{
                                    '&.Mui-selected': { bgcolor: '#F5F5F5' },
                                    '&:hover': { bgcolor: '#F5F5F5' },
                                    justifyContent: 'center',
                                    py: 2,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 'auto',
                                        justifyContent: 'center',
                                        color: '#A87B4F',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>

            {/* Seção Gerenciamento no mobile */}
            <Box
                sx={{
                    bgcolor: 'mainTransparent.main',
                    color: 'white',
                    py: 1,
                }}
            >
                <Box sx={{ height: 8 }} />
            </Box>

            <List sx={{ pt: 0 }}>
                {managementItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <Tooltip title={item.text} placement="left" arrow>
                            <ListItemButton
                                onClick={() => handleMenuClick(item.path)}
                                selected={currentPath === item.path}
                                sx={{
                                    '&.Mui-selected': { bgcolor: '#F5F5F5' },
                                    '&:hover': { bgcolor: '#F5F5F5' },
                                    justifyContent: 'center',
                                    py: 2,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 'auto',
                                        justifyContent: 'center',
                                        color: '#A87B4F',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const drawer = (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '4px 0 6px -2px rgba(0,0,0,1)'
        }}>

            {/* Header com Logo e Título */}
            <Box sx={{
                bgcolor: '#A87B4F',
                color: 'white',
                p: drawerOpen ? 2 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: drawerOpen ? 'flex-start' : 'center',
                gap: drawerOpen ? 2 : 0,
                minHeight: drawerOpen ? 'auto' : 100,
                transition: theme.transitions.create(['padding', 'min-height'], {
                    duration: theme.transitions.duration.standard,
                })
            }}>
                <Box
                    component="img"
                    src={LogoParoquia}
                    alt="Logo"
                    sx={{
                        width: drawerOpen ? 120 : 80,
                        height: drawerOpen ? 120 : 80,
                        transition: theme.transitions.create(['width', 'height'], {
                            duration: theme.transitions.duration.standard,
                        })
                    }}
                />
                {drawerOpen && (
                    <Box sx={{
                        opacity: drawerOpen ? 1 : 0,
                        transition: theme.transitions.create('opacity', {
                            duration: theme.transitions.duration.standard,
                        })
                    }}>
                        <Typography variant="mainText" sx={{ fontSize: '2rem', display: 'block' }}>
                            Sacramentum
                        </Typography>
                        <Typography variant="secondaryText" sx={{ fontSize: '1rem', display: 'block' }}>
                            {userData?.parish || 'Nome da Paróquia'}
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Seção Página Inicial */}
            {drawerOpen && (
                <Box sx={{
                    bgcolor: 'mainTransparent.main',
                    color: 'white',
                    px: 3,
                    py: 3,
                    opacity: drawerOpen ? 1 : 0,
                    transition: theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.standard,
                    })
                }}>
                    <Typography
                        sx={{
                            color: 'secondary.main',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            paddingLeft: 3,
                        }}
                        variant="secondaryText"
                    >
                        Página Inicial
                    </Typography>
                </Box>
            )}

            <List sx={{ pt: drawerOpen ? 0 : 1 }}>
                {menuItems.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <Tooltip
                            title={!drawerOpen ? item.text : ""}
                            placement="right"
                            arrow
                        >
                            <ListItemButton
                                onClick={() => handleMenuClick(item.path)}
                                selected={currentPath === item.path}
                                sx={{
                                    '&.Mui-selected': { bgcolor: '#F5F5F5' },
                                    '&:hover': { bgcolor: '#F5F5F5' },
                                    py: 2,
                                    px: drawerOpen ? 2 : 1,
                                    justifyContent: drawerOpen ? 'flex-start' : 'center',
                                    borderBottom: (theme) =>
                                        drawerOpen
                                            ? index === menuItems.length - 1
                                                ? 'none'
                                                : `1px solid ${theme.palette.mainTransparent.main}`
                                            : 'none',
                                    transition: (theme) =>
                                        theme.transitions.create(['padding', 'justify-content'], {
                                            duration: theme.transitions.duration.standard,
                                        }),
                                }}
                            >
                                <ListItemIcon sx={{
                                    color: '#A87B4F',
                                    minWidth: drawerOpen ? 60 : 'auto',
                                    justifyContent: 'center',
                                    transition: theme.transitions.create('min-width', {
                                        duration: theme.transitions.duration.standard,
                                    })
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                {drawerOpen && (
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontFamily: 'secondaryText.fontFamily',
                                            fontSize: '1.5rem',
                                            color: 'secondary.main'
                                        }}
                                        sx={{
                                            opacity: drawerOpen ? 1 : 0,
                                            transition: theme.transitions.create('opacity', {
                                                duration: theme.transitions.duration.standard,
                                            })
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>

            {/* Seção Gerenciamento */}
            <Box
                sx={{
                    bgcolor: 'mainTransparent.main',
                    color: 'white',
                    px: 3,
                    py: 3,
                    transition: theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.standard,
                    }),
                }}
            >
                {/* Mostrar texto apenas se drawer estiver aberto ou não for mobile */}
                {(drawerOpen) && (
                    <Typography
                        sx={{
                            color: 'secondary.main',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            paddingLeft: 3,
                        }}
                        variant="secondaryText"
                    >
                        Gerenciamento
                    </Typography>
                )}
            </Box>

            <List sx={{ pt: drawerOpen ? 0 : 1 }}>
                {managementItems.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <Tooltip
                            title={!drawerOpen ? item.text : ""}
                            placement="right"
                            arrow
                        >
                            <ListItemButton
                                onClick={() => handleMenuClick(item.path)}
                                selected={currentPath === item.path}
                                sx={{
                                    '&.Mui-selected': { bgcolor: '#F5F5F5' },
                                    '&:hover': { bgcolor: '#F5F5F5' },
                                    py: 2,
                                    px: drawerOpen ? 2 : 1,
                                    justifyContent: drawerOpen ? 'flex-start' : 'center',
                                    borderBottom: (theme) =>
                                        drawerOpen
                                            ? index === managementItems.length - 1
                                                ? 'none'
                                                : `1px solid ${theme.palette.mainTransparent.main}`
                                            : 'none',
                                    transition: (theme) =>
                                        theme.transitions.create(['padding', 'justify-content'], {
                                            duration: theme.transitions.duration.standard,
                                        }),
                                }}
                            >
                                <ListItemIcon sx={{
                                    color: '#A87B4F',
                                    minWidth: drawerOpen ? 60 : 'auto',
                                    justifyContent: 'center',
                                    transition: theme.transitions.create('min-width', {
                                        duration: theme.transitions.duration.standard,
                                    })
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                {drawerOpen && (
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontFamily: 'secondaryText.fontFamily',
                                            fontSize: '1.5rem',
                                            color: 'secondary.main',
                                        }}
                                        sx={{
                                            opacity: drawerOpen ? 1 : 0,
                                            transition: theme.transitions.create('opacity', {
                                                duration: theme.transitions.duration.standard,
                                            })
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>

            {/* Footer */}
            {drawerOpen && (
                <Box sx={{
                    mt: 'auto',
                    p: 2,
                    opacity: drawerOpen ? 1 : 0,
                    transition: theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.standard,
                    })
                }}>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '1rem',
                            textAlign: 'center',
                            display: 'block',
                            color: '#777',
                            whiteSpace: 'pre-line',
                            wordWrap: 'break-word',
                        }}
                    >
                        Desenvolvido com <Favorite color='primary' /> pelos estudantes de engenharia de Software - UNIFAE
                    </Typography>

                </Box>
            )}
        </Box>
    );

    return (
        <Box>
            {isMobile ? (
                <StyledDrawer
                    variant="permanent"
                    open={false}
                    sx={{
                        position: 'fixed',
                        right: 0,
                        top: 0,
                        height: '100vh',
                        width: drawerWidthClosed,
                        '& .MuiDrawer-paper': {
                            width: drawerWidthClosed,
                            overflowX: 'hidden',
                            boxShadow: '-4px 0 6px -2px rgba(0,0,0,0.3)',
                        },
                    }}
                >
                    {mobileDrawer}
                </StyledDrawer>
            ) : (
                <StyledDrawer variant="permanent" open={drawerOpen}>
                    {drawer}
                </StyledDrawer>
            )}
        </Box>
    );
}