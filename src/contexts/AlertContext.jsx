import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert as MuiAlert, Typography, alpha } from '@mui/material';
import theme from '../configs/theme.jsx';

const AlertContext = createContext();

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) throw new Error('useAlert precisa estar dentro de AlertProvider');
    return context;
};

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        open: false,
        title: '',
        message: '',
        severity: 'info',
    });

    const exibirAlerta = (message, title = '', severity = 'info') => {
        setAlert({ open: true, title, message, severity });
    };

    const handleClose = () => {
        setAlert(prev => ({ ...prev, open: false }));
    };

    const getAlertBackground = (severity) => {
        switch (severity) {
            case 'error':
                return alpha(theme.palette.error.main, 0.2);
            case 'success':
                return alpha(theme.palette.secondary.main, 0.2);
            case 'warning':
                return alpha(theme.palette.primary.main, 0.2);
            case 'info':
            default:
                return alpha(theme.palette.primary.main, 0.2);
        }
    };

    return (
        <AlertContext.Provider value={{ exibirAlerta }}>
            {children}

            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert
                    onClose={handleClose}
                    severity={alert.severity}
                    sx={{
                        width: '100%',
                        backgroundColor: getAlertBackground(alert.severity),
                        color: theme.palette.textSecondary.main,
                    }}
                    variant="filled"
                >
                    {alert.title && (
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            {alert.title}
                        </Typography>
                    )}
                    <Typography variant="body2">
                        {alert.message}
                    </Typography>
                </MuiAlert>
            </Snackbar>
        </AlertContext.Provider>
    );
};
