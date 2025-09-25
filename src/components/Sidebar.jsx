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
    Person, Favorite, Dashboard
} from '@mui/icons-material';
import { useApp } from "../contexts/AppContext.jsx";
import LogoParoquia from "../assets/images/logo_paroquia.png";
import {useNavigate} from "react-router-dom";

const drawerWidthOpen = 240;
const drawerWidthClosed = 55;

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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

    const handleMenuClick = (path, title) => {
        setCurrentPath(path);
        setTitle(title);
        navigate(path);
        if (isMobile) handleCloseDrawer();
    };

    const drawer = (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '4px 0 6px -2px rgba(0,0,0,1)'
        }}>
            {/* Header com Logo e Título */}
            <Box
                sx={{
                    bgcolor: '#A87B4F',
                    color: 'white',
                    p: drawerOpen ? 1.3 : 0.7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: drawerOpen ? 'flex-start' : 'center',
                    gap: drawerOpen ? 1.3 : 0,
                    minHeight: drawerOpen ? 'auto' : { xs: 72, sm: 67 }, // força altura no mobile
                    transition: theme.transitions.create(['padding', 'min-height'], {
                        duration: theme.transitions.duration.standard,
                    }),
                }}
            >
                <Box
                    component="img"
                    src={LogoParoquia}
                    alt="Logo"
                    sx={{
                        width: drawerOpen ? 80 : { xs: 56, sm: 64 },
                        height: drawerOpen ? 80 : { xs: 56, sm: 64 },
                        transition: theme.transitions.create(['width', 'height'], {
                            duration: theme.transitions.duration.standard,
                        }),
                    }}
                />
                {drawerOpen && (
                    <Box
                        sx={{
                            transition: theme.transitions.create('opacity', {
                                duration: theme.transitions.duration.standard,
                            }),
                        }}
                    >
                        <Typography variant="mainText" sx={{ fontSize: '1.34rem', display: 'block' }}>
                            Sacramentum
                        </Typography>
                        <Typography variant="secondaryText" sx={{ fontSize: '0.67rem', display: 'block' }}>
                            {userData?.parish || 'Nome da Paróquia'}
                        </Typography>
                    </Box>
                )}
            </Box>

            <List sx={{ pt: drawerOpen ? 0 : 0.7 }}> {/* 1 * 0.67 = 0.67 */}
                <ListItem key={"Dashboard"} disablePadding>
                    <Tooltip
                        title={!drawerOpen ? "Dashboard" : ""}
                        placement="right"
                        arrow
                    >
                        <ListItemButton
                            onClick={() => handleMenuClick('/dashboard')}
                            selected={currentPath === '/dashboard'}
                            sx={{
                                '&.Mui-selected': { bgcolor: '#F5F5F5' },
                                '&:hover': { bgcolor: '#F5F5F5' },
                                py: 1.3, // 2 * 0.67 = 1.34
                                px: drawerOpen ? 1.3 : 0.7, // 2 * 0.67 = 1.34, 1 * 0.67 = 0.67
                                justifyContent: drawerOpen ? 'flex-start' : 'center',
                                transition: (theme) =>
                                    theme.transitions.create(['padding', 'justify-content'], {
                                        duration: theme.transitions.duration.standard,
                                    }),
                            }}
                        >
                            <ListItemIcon sx={{
                                color: '#A87B4F',
                                minWidth: drawerOpen ? 40 : 'auto', // 60 * 0.67 = 40
                                justifyContent: 'center',
                                transition: theme.transitions.create('min-width', {
                                    duration: theme.transitions.duration.standard,
                                })
                            }}>
                                <Dashboard sx={{ fontSize: 21 }} /> {/* 32 * 0.67 = 21 (assumindo que era 32 como os outros) */}
                            </ListItemIcon>
                            {drawerOpen && (
                                <ListItemText
                                    primary={"Dashboard"}
                                    primaryTypographyProps={{
                                        fontFamily: 'secondaryText.fontFamily',
                                        fontSize: '0.8rem', // 1.2rem * 0.67 = 0.8rem
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
            </List>

            {/* Seção Página Inicial */}
            <Box
                sx={{
                    bgcolor: 'mainTransparent.main',
                    color: 'white',
                    px: 2, // 3 * 0.67 = 2
                    py: 2, // 3 * 0.67 = 2
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
                            fontSize: '0.8rem', // 1.2rem * 0.67 = 0.8rem
                            paddingLeft: 2, // 3 * 0.67 = 2
                        }}
                        variant="secondaryText"
                    >
                        Página Inicial
                    </Typography>
                )}
            </Box>

            <List sx={{ pt: drawerOpen ? 0 : 0.7 }}> {/* 1 * 0.67 = 0.67 */}
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
                                    py: 1.3, // 2 * 0.67 = 1.34
                                    px: drawerOpen ? 1.3 : 0.7, // 2 * 0.67 = 1.34, 1 * 0.67 = 0.67
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
                                    minWidth: drawerOpen ? 40 : 'auto', // 60 * 0.67 = 40
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
                                            fontSize: '0.8rem', // 1.2rem * 0.67 = 0.8rem
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
                    px: 2, // 3 * 0.67 = 2
                    py: 2, // 3 * 0.67 = 2
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
                            fontSize: '0.8rem', // 1.2rem * 0.67 = 0.8rem
                            paddingLeft: 2, // 3 * 0.67 = 2
                        }}
                        variant="secondaryText"
                    >
                        Gerenciamento
                    </Typography>
                )}
            </Box>

            <List sx={{ pt: drawerOpen ? 0 : 0.7 }}> {/* 1 * 0.67 = 0.67 */}
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
                                    py: 1.3, // 2 * 0.67 = 1.34
                                    px: drawerOpen ? 1.3 : 0.7, // 2 * 0.67 = 1.34, 1 * 0.67 = 0.67
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
                                    minWidth: drawerOpen ? 40 : 'auto', // 60 * 0.67 = 40
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
                                            fontSize: '0.8rem', // 1.2rem * 0.67 = 0.8rem
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
                    p: 1.3, // 2 * 0.67 = 1.34
                    opacity: drawerOpen ? 1 : 0,
                    transition: theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.standard,
                    })
                }}>
                    <Typography
                        variant="secondaryText"
                        sx={{
                            fontSize: '0.67rem', // 1rem * 0.67 = 0.67rem
                            textAlign: 'center',
                            display: 'block',
                            color: '#777',
                            whiteSpace: 'pre-line',
                            wordWrap: 'break-word',
                        }}
                    >
                        Desenvolvido com <Favorite color='primary' sx={{ fontSize: 13 }} /> pelos estudantes de Engenharia de Software - UNIFAE {/* 20 * 0.67 = 13 (assumindo tamanho padrão de 20) */}
                    </Typography>

                </Box>
            )}
        </Box>
    );

    return (
        <Box>
            <StyledDrawer variant="permanent" open={drawerOpen}>
                {drawer}
            </StyledDrawer>
        </Box>
    );
}