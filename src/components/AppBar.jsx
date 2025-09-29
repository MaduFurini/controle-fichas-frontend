import React, {useState} from 'react';
import {
    AppBar as MuiAppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    useMediaQuery,
    useTheme,
    styled, Grid
} from '@mui/material';
import {
    Menu as MenuIcon,
    AccountCircle,
    Settings,
    Logout,
    Person
} from '@mui/icons-material';
import { useApp } from '../contexts/AppContext.jsx';

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})(({ theme, open, drawerWidth }) => ({
    backgroundColor: '#FFFFFF',
    color: '#333',
    boxShadow: 'none',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth})`,
    }),
    ...(!open && {
        width: `calc(100% - ${drawerWidth})`,
    }),
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        width: `calc(100% - ${drawerWidth})`,
    },
}));

export function AppBar({ drawerWidth, title }) {
    const { drawerOpen, handleToggleDrawer, userData } = useApp();

    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleProfileMenuClose();
        console.log('Logout clicked');
    };

    const handleSettings = () => {
        handleProfileMenuClose();
        console.log('Settings clicked');
    };

    const handleProfile = () => {
        handleProfileMenuClose();
        console.log('Profile clicked');
    };

    const isMenuOpen = Boolean(anchorEl);

    return (
        <>
            <StyledAppBar open={drawerOpen} drawerWidth={drawerWidth}>
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        zIndex: 1,
                        height: '6vh',
                    }}
                >
                    {/* Lado esquerdo - Botão do menu */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="toggle drawer"
                            onClick={handleToggleDrawer}
                            edge="start"
                            sx={{
                                color: '#A87B4F',
                                '&:hover': {
                                    backgroundColor: 'rgba(168, 123, 79, 0.1)',
                                }
                            }}
                        >
                            <MenuIcon sx={{ fontSize: 28 }} />
                        </IconButton>

                        <Typography
                            variant="h2"
                            noWrap
                            component="div"
                            sx={{
                                ml: 2,
                                color: '#A87B4F',
                                fontWeight: 'bold',
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            Sistema de Gerenciamento de Festividades
                        </Typography>
                    </Box>

                    {/* Lado direito - Perfil do usuário */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                color: '#333',
                                fontWeight: 500
                            }}
                        >
                            Olá {userData?.name || 'Usuário'}!
                        </Typography>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="profile-menu"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            sx={{
                                color: '#A87B4F',
                                '&:hover': {
                                    backgroundColor: 'rgba(168, 123, 79, 0.1)',
                                }
                            }}
                        >
                            {userData?.avatar ? (
                                <Avatar src={userData.avatar} sx={{ width: 42, height: 42 }} />
                            ) : (
                                <AccountCircle sx={{ fontSize: 32 }} />
                            )}
                        </IconButton>
                    </Box>
                </Toolbar>

                {/* Header dinâmico (abaixo da Toolbar) */}
                <Box
                    sx={{
                        width: '100%',
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        pl: isMobile ? 2 : drawerOpen ? '55px' : '50px',
                        pr: 3,
                        backgroundColor: '#f5f5f5',
                        borderTop: `1px solid ${theme.palette.divider}`,
                        borderBottom: 'none',
                        boxShadow: 'none',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'primary.main',
                            fontFamily: theme.typography.secondaryText.fontFamily,
                            fontWeight: 'bold',
                            fontSize: '2.5rem',
                            mt: 3
                        }}
                    >
                        {title || 'Dashboard'}
                    </Typography>
                </Box>
            </StyledAppBar>


            {/* Menu do Perfil */}
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleProfileMenuClose}
                onClick={handleProfileMenuClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        minWidth: 200,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/* Header do menu com informações do usuário */}
                <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="secondaryText" component="div" sx={{ fontWeight: 600 }}>
                        {userData?.name || 'Usuário'}
                    </Typography>
                    <Typography variant="secondaryText" component="div" sx={{ color: 'text.secondary' }}>
                        {userData?.email || 'usuario@email.com'}
                    </Typography>
                </Box>

                {/* Opções do menu */}
                <MenuItem onClick={handleProfile} sx={{ py: 1.5, fontFamily: 'secondaryText.fontFamily' }}>
                    <ListItemIcon>
                        <Person fontSize="small" sx={{ fontSize: 24 ,color: '#A87B4F' }} />
                    </ListItemIcon>
                    Meu Perfil
                </MenuItem>

                <MenuItem onClick={handleSettings} sx={{ py: 1.5, fontFamily: 'secondaryText.fontFamily' }}>
                    <ListItemIcon>
                        <Settings fontSize="small" sx={{ fontSize: 24, color: '#A87B4F' }} />
                    </ListItemIcon>
                    Configurações
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main', fontFamily: 'secondaryText.fontFamily' }}>
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: 'error.main' }} />
                    </ListItemIcon>
                    Sair
                </MenuItem>
            </Menu>
        </>
    );
}