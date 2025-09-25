import { Helmet } from "react-helmet-async";
import {
    Box,
    Button, CircularProgress,
    Container,
    Divider,
    FormControl,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form"
import {Link, useNavigate} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import Theme from "../../configs/theme.jsx";
import {grey} from "@mui/material/colors";
import {useState} from "react";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {useAlert} from "../../contexts/AlertContext.jsx";
import theme from "../../configs/theme.jsx";

function Login() {
    const { login } = useAuth();
    const { exibirAlerta } = useAlert();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            senha: ""
        }
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            // const result = await login(data);
            //
            // if (!result.success) {
            //     exibirAlerta(result.error, '', 'error');
            // }

            navigate("/sacramentum/dashboard");
        } catch (error) {
            const messageError = error?.response ? 'Email ou senha inválidos.' : 'Erro na conexão com o servidor.';
            exibirAlerta(messageError, '', 'error');
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <>
            <Helmet title={'Login'} defer={false} />

            <Container
                maxWidth={'sm'}
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Paper
                    sx={{
                        width: "100%",
                        p: 4,
                        borderTopColor: "secondary.main",
                        borderTopStyle: "solid",
                        borderTopWidth: 8,
                        backgroundColor: "rgba(209, 169, 125, 0.15)",
                    }}
                    elevation={4}>
                    <Box
                        component="img"
                        src={Logo}
                        alt="Sacramentum - Sistema de Gerenciamento de Festividades"
                        sx={{
                            height: 'auto',
                            width: '50%',
                            margin: "0 auto",
                            display: "block",
                            mb: 2
                        }}
                    />

                    <Typography
                        variant='h1'
                        component={'h1'}
                        textAlign={'center'}
                        color='secondary.main'
                    >
                        Sacramentum
                    </Typography>
                    <Typography
                        variant='h2'
                        component={'h1'}
                        textAlign={'center'}
                        color='secondary.main'
                    >
                        Sistema de Gerenciamento de Festividades
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl
                            variant="standard"
                            fullWidth
                            sx={{
                                px: {
                                    xs: 1,
                                    lg: 7
                                }, my: 3
                            }}
                        >
                            <TextField
                                type='email'
                                margin="dense"
                                placeholder="Informe seu email"
                                id="email"
                                name="email"
                                error={errors.email && true}
                                fullWidth
                                {...register("email", { required: true })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon color="secondary" />
                                        </InputAdornment>
                                    )
                                }}
                                sx={(theme) => ({
                                    "& .MuiInputBase-input::placeholder": {
                                        fontFamily: theme.typography.secondaryText,
                                    },
                                    "& .MuiInputBase-input": {
                                        fontFamily: theme.typography.secondaryText,
                                    },
                                })}
                            />

                            <TextField
                                type='password'
                                margin="dense"
                                placeholder="Informe sua senha"
                                id="password"
                                name="password"
                                error={errors.password && true}
                                fullWidth
                                {...register("password", { required: true })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PasswordIcon color="secondary" />
                                        </InputAdornment>
                                    )
                                }}
                                sx={(theme) => ({
                                    "& .MuiInputBase-input::placeholder": {
                                        fontFamily: theme.typography.secondaryText,
                                    },
                                    "& .MuiInputBase-input": {
                                        fontFamily: theme.typography.secondaryText,
                                    },
                                })}
                            />
                        </FormControl>

                        <Stack
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                            spacing={1}
                        >
                            <Link
                                to="/forgot-password"
                                style={{
                                    textDecoration: 'none',
                                    color: Theme.palette.secondary.main,
                                }}
                            >
                                <Typography
                                    variant='secondaryText'
                                    sx={{
                                        textDecoration: 'underline',
                                    }}
                                >
                                    Esqueci minha senha
                                </Typography>
                            </Link>
                        </Stack>

                        <Stack
                            direction='row'
                            justifyContent='flex-end'
                            alignItems='center'
                            spacing={1}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                disabled={Object.keys(errors).length > 0 || isLoading }
                                startIcon={isLoading && <CircularProgress size={16} sx={{ color: grey[400] }} />}
                                sx={{ fontFamily: (theme) => theme.typography.secondaryText }}
                            >
                                Acessar
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    );
}

export default Login;