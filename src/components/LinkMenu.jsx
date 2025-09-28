import { Link } from 'react-router-dom';
import {
    Box,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material';

function TooltipItemDrawerClosed({ children, title, drawerOpen, ...props }) {
    return (
        <Tooltip
            {...props}
            arrow
            placement="right"
            title={
                !drawerOpen &&
                <Box sx={{ whiteSpace: 'nowrap' }}>
                    <Typography variant="subtitle2" sx={{ color: 'white' }}>
                        {title}
                    </Typography>
                </Box>
            }
        >
            {children}
        </Tooltip>
    )
}

export function LinkMenu({ title, url, icon, handleCloseDrawer, isMobileScreen, drawerOpen }) {
    return (
        <Link
            to={url}
            onClick={() => {
                if (isMobileScreen) {
                    handleCloseDrawer()
                }
            }}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <TooltipItemDrawerClosed title={title} drawerOpen={drawerOpen}>
                <ListItemButton sx={{ px: 3 }}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={title} />
                </ListItemButton>
            </TooltipItemDrawerClosed>
        </Link>
    )
}
