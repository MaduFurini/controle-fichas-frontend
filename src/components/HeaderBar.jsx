import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

export default function HeaderBar({ title, drawerWidth }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: isSmall ? "10%" : isMobile ? "15%" : "20%",
                padding: isSmall ? "20px 10px" : isMobile ? "50px 15px" : "100px 10px",
                marginLeft: isMobile ? 0 : drawerWidth,
                alignItems: "center",
                color: theme.palette.textSecondary.main,
                fontfamily: theme.typography.secondaryText,
                transition: theme.transitions.create('margin-left', {
                    duration: theme.transitions.duration.standard,
                })
            }}
        >
            <Typography
                variant={isSmall ? "h6" : isMobile ? "h5" : "h4"}
                sx={{
                    color: 'black',
                    fontWeight: "bold"
                }}
            >
                {title}
            </Typography>
        </Box>
    );
}
