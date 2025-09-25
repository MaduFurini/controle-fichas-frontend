import {createTheme, responsiveFontSizes} from "@mui/material";
import LondrinaSolid from './fonts/LondrinaSolid-Regular.ttf'
import Roboto from './fonts/RobotoCondensed-VariableFont_wght.ttf'

let theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#9C6E43'
        },
        secondary: {
            main: '#603A20'
        },
        mainTransparent: {
            main: 'rgba(156, 110, 67, 0.7)'
        },
        light: {
            main: 'rgba(209, 169, 125, 0.15)'
        },
        error: {
            main: '#f10606',
        },
        background: {
            default: '#EFEFEF',
        },
        textSecondary: {
            main: '#603A20',
        },
    },
    typography: {
        fontFamily: 'Roboto Condensed',
        fontSize: 13,
        h1: {
            fontSize: '2rem',
            fontFamily: 'LondrinaSolid Regular',
        },
        h2: {
            fontSize: '1.3rem',
            fontFamily: 'Roboto Condensed Bold',
        },
        h3: {
            fontSize: '1.1rem',
            fontFamily: 'Roboto Condensed Bold',
        },
        mainText: {
            fontFamily: 'LondrinaSolid Regular',
        },
        secondaryText: {
            fontFamily: 'Roboto Condensed Regular',
        }
    },
    components: {

        MuiBreadcrumbs: {
            styleOverrides: {
                root: {
                    fontSize: "0.8em",
                    marginBottom: 15
                }
            }
        },

        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: "#d8d8d8"
                }
            }
        },

        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontSize: "1rem",
                    fontWeight: "bold"
                }
            }
        },

        MuiDialog: {
            styleOverrides: {
                paper: {
                    // sm (600px)
                    '@media (max-width: 600px)': {
                        width: '100%',
                        margin: '12px',
                    },
                },
            },
        },

        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                  font-family: 'Roboto Condensed Regular';
                  src: url(${Roboto}) format('truetype');
                }
                      
                @font-face {
                  font-family: 'Roboto Condensed Bold';
                  src: url(${Roboto}) format('truetype');
                }
        
                @font-face {
                  font-family: 'Roboto Condensed Light';
                  src: url(${Roboto}) format('truetype');
                }
                
                @font-face {
                  font-family: 'LondrinaSolid Regular';
                  src: url(${LondrinaSolid}) format('truetype');
                }
        `,
        },
    }
});

theme = responsiveFontSizes(theme);

export default theme