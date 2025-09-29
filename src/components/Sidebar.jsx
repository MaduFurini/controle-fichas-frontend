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
    Grid, Stack, ListSubheader, IconButton, Box, Collapse
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {
    Computer,
    Event,
    Devices,
    Inventory,
    Assessment,
    Church,
    Person, Favorite, Dashboard, Close, Image, DashboardOutlined,
    ExpandLess, ExpandMore, Category, ShoppingCart, Receipt, AccountBalance
} from '@mui/icons-material';
import { useApp } from "../contexts/AppContext.jsx";
import LogoParoquia from "../assets/images/logo_paroquia.png";
import {useNavigate} from "react-router-dom";
import {LinkMenu} from "./LinkMenu.jsx";

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
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
            width: open ? 400 : 100,
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            overflow: "hidden",
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    })
);

const menuItems = [
    { text: 'Festividades', icon: <Event sx={{ fontSize: 28, color: 'primary.main' }} />, path: '/festividades' },
    { text: 'Equipamentos', icon: <Devices sx={{ fontSize: 28, color: 'primary.main' }} />, path: '/equipamentos' },
    {
        text: 'Produtos',
        icon: <Inventory sx={{ fontSize: 28, color: 'primary.main' }} />,
        path: '/produtos',
        hasSubmenu: true,
        submenu: [
            { text: 'Gerenciar Produtos', icon: <ShoppingCart sx={{ fontSize: 22, color: 'primary.main' }} />, path: '/produtos/gerenciar' },
            { text: 'Categorias', icon: <Category sx={{ fontSize: 22, color: 'primary.main' }} />, path: '/produtos/categorias' }
        ]
    },
    {
        text: 'Relatórios',
        icon: <Assessment sx={{ fontSize: 28, color: 'primary.main' }} />,
        path: '/relatorios',
        hasSubmenu: true,
        submenu: [
            { text: 'Itens Vendidos', icon: <Receipt sx={{ fontSize: 22, color: 'primary.main' }} />, path: '/relatorios/vendas' },
            { text: 'Relatório Financeiro', icon: <AccountBalance sx={{ fontSize: 22, color: 'primary.main' }} />, path: '/relatorios/financeiro' }
        ]
    }
];

const managementItems = [
    { text: 'Comunidades', icon: <Church sx={{ fontSize: 28, color: 'primary.main' }} />, path: '/comunidades' },
    { text: 'Usuários', icon: <Person sx={{ fontSize: 28, color: 'primary.main' }} />, path: '/usuarios' }
];

export default function Sidebar() {
    const { drawerOpen, userData, handleCloseDrawer } = useApp();
    const { setTitle } = useApp();

    const [currentPath, setCurrentPath] = useState('/festividades');
    const [expandedItems, setExpandedItems] = useState({});

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const isXXlScreen = useMediaQuery('(min-width:1921px)');

    const navigate = useNavigate();

    const handleMenuClick = (path, title) => {
        setCurrentPath(path);
        setTitle(title);
        navigate(path);
        if (isMobile) handleCloseDrawer();
    };

    const handleSubmenuToggle = (itemText) => {
        setExpandedItems(prev => ({
            ...prev,
            [itemText]: !prev[itemText]
        }));
    };

    useEffect(() => {
        if (isMobile) handleCloseDrawer(true);
        else handleCloseDrawer(false);
    }, [isMobile]);

    const renderMenuItem = (item, index) => {
        const hasSubmenu = item.hasSubmenu && item.submenu;
        const isExpanded = expandedItems[item.text];
        const isParentSelected = hasSubmenu && item.submenu.some(subItem => subItem.path === currentPath);

        return (
            <React.Fragment key={index}>
                <Tooltip title={!drawerOpen ? item.text : ""} placement="right">
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                if (hasSubmenu) {
                                    handleSubmenuToggle(item.text);
                                } else {
                                    handleMenuClick(item.path, item.text);
                                }
                            }}
                            selected={currentPath === item.path || isParentSelected}
                            sx={{
                                minHeight: 48,
                                justifyContent: drawerOpen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: drawerOpen ? 3 : 0,
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {drawerOpen && (
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: "1.4rem",
                                        color: "secondary.main",
                                        fontFamily: "secondaryText.fontFamily"
                                    }}
                                    sx={{ opacity: drawerOpen ? 1 : 0 }}
                                />
                            )}
                            {drawerOpen && hasSubmenu && (
                                isExpanded ? <ExpandLess /> : <ExpandMore />
                            )}
                        </ListItemButton>
                    </ListItem>
                </Tooltip>

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.submenu.map((subItem, subIndex) => (
                                <Tooltip key={subIndex} title={!drawerOpen ? subItem.text : ""} placement="right">
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={() => handleMenuClick(subItem.path, subItem.text)}
                                            selected={currentPath === subItem.path}
                                            sx={{
                                                minHeight: 40,
                                                justifyContent: drawerOpen ? 'initial' : 'center',
                                                pl: drawerOpen ? 4 : 3.5,
                                                pr: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: drawerOpen ? 2 : 0,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {subItem.icon}
                                            </ListItemIcon>
                                            {drawerOpen && (
                                                <ListItemText
                                                    primary={subItem.text}
                                                    primaryTypographyProps={{
                                                        fontSize: "1.2rem",
                                                        color: "secondary.main",
                                                        fontFamily: "secondaryText.fontFamily"
                                                    }}
                                                    sx={{ opacity: drawerOpen ? 1 : 0 }}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                </Tooltip>
                            ))}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        );
    };

    const menu = () => {
        return (
            <>
                {/* Header fixo */}
                <Stack
                    direction="row"
                    justifyContent={drawerOpen ? "space-between" : "center"}
                    alignItems="center"
                    spacing={drawerOpen ? 2 : 0}
                    sx={{
                        px: drawerOpen ? 2 : 1,
                        py: drawerOpen ? 2 : 1,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        bgcolor: "primary.main",
                        minHeight: 80,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: drawerOpen ? 1 : 0,
                            minWidth: 0,
                            overflowX: 'hidden',
                            justifyContent: drawerOpen ? "flex-start" : "center",
                        }}
                    >
                        <img
                            src={LogoParoquia}
                            alt="Logo"
                            style={{
                                width: drawerOpen ? 90 : 70,
                                height: drawerOpen ? 90 : 70,
                                transition: 'all 0.3s ease'
                            }}
                        />
                        {drawerOpen && (
                            <Box sx={{ overflow: "hidden" }}>
                                <Typography variant="h1" color='white' noWrap>
                                    Sacramentum
                                </Typography>
                                <Typography variant="secondaryText" color="white" noWrap>
                                    Nome da Paróquia
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {drawerOpen && (
                        <IconButton
                            onClick={handleCloseDrawer}
                            sx={{
                                display: { xs: "block", lg: "none" },
                                color: "inherit",
                            }}
                        >
                            <Close />
                        </IconButton>
                    )}
                </Stack>

                {/* Lista de menus */}
                <List
                    sx={{
                        overflowX: "hidden",
                        width: "100%",
                        minHeight: isXXlScreen ? "100vh" : "auto",
                        height: { md: "100%" },
                        bgcolor: "background.paper",
                        boxShadow: { xs: 0, lg: 2 },
                        p: 0
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    disablePadding
                >
                    {/* Dashboard */}
                    <Tooltip title={!drawerOpen ? "Dashboard" : ""} placement="right">
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleMenuClick('/dashboard', 'Dashboard')}
                                selected={currentPath === '/dashboard'}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawerOpen ? 'initial' : 'center',
                                    px: 2.5
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawerOpen ? 3 : 0,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <DashboardOutlined sx={{ fontSize: 28, color: 'primary.main' }} />
                                </ListItemIcon>
                                {drawerOpen && (
                                    <ListItemText
                                        primary="Dashboard"
                                        primaryTypographyProps={{
                                            fontSize: "1.4rem",
                                            color: "secondary.main",
                                            fontFamily: "secondaryText.fontFamily"
                                        }}
                                        sx={{ opacity: drawerOpen ? 1 : 0 }}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    </Tooltip>

                    {/* Seção Página Inicial */}
                    <ListSubheader
                        sx={{
                            bgcolor: "mainTransparent.main",
                            color: "white",
                            fontWeight: "bold",
                            lineHeight: "36px",
                            fontSize: "16px",
                            pl: 5,
                            pt: 2,
                            pb: 2
                        }}
                    >
                        {drawerOpen ? 'Página Inicial' : ''}
                    </ListSubheader>

                    {/* Menu Items */}
                    {menuItems.map((item, index) => renderMenuItem(item, index))}

                    {/* Seção Gerenciamento */}
                    <ListSubheader
                        sx={{
                            bgcolor: "mainTransparent.main",
                            color: "white",
                            fontWeight: "bold",
                            lineHeight: "36px",
                            fontSize: "16px",
                            pl: 5,
                            pt: 2,
                            pb: 2
                        }}
                    >
                        {drawerOpen ? 'Gerenciamento' : ''}
                    </ListSubheader>

                    {/* Management Items */}
                    {managementItems.map((item, index) => (
                        <Tooltip key={index} title={!drawerOpen ? item.text : ""} placement="right">
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleMenuClick(item.path, item.text)}
                                    selected={currentPath === item.path}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: drawerOpen ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: drawerOpen ? 3 : 0,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    {drawerOpen && (
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                fontSize: "1.4rem",
                                                color: "secondary.main",
                                                fontFamily: "secondaryText.fontFamily"
                                            }}
                                            sx={{ opacity: drawerOpen ? 1 : 0 }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </>
        );
    };

    return (
        <>
            {isMobile ?
                (
                    <Drawer
                        variant='temporary'
                        anchor='left'
                        open={drawerOpen}
                        onClose={handleCloseDrawer}
                        sx={{
                            '& .MuiDrawer-paper': {
                                width: '100vw',
                                maxWidth: 320,
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
                        {menu()}
                    </PermanentDrawer>
                )
            }
        </>
    );
}