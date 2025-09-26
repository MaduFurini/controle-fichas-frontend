import { useEffect, useState } from 'react';
import { Box, Card, Grid, Typography, useTheme, useMediaQuery, styled } from "@mui/material";
import { MenuBook, SkipNext } from "@mui/icons-material";
import CruzEvangelho from "../../assets/images/cruz_evangelho.png";
import { useApp } from "../../contexts/AppContext.jsx"; // 🔹 importa contexto do drawer

// 🔹 Container que responde ao sidebar
const DashboardContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})(({ theme, open, drawerWidth }) => ({
    flexGrow: 1,
    paddingTop: theme.spacing(15),
    boxSizing: "border-box",
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - 8}px)`,
    }),
    ...(!open && {
        width: `calc(100% - 55px)`,
    }),
    [theme.breakpoints.down("md")]: {
        marginLeft: 0,
        width: "100%",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

export default function Dashboard() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { drawerOpen } = useApp(); // 🔹 pega se sidebar está aberto

    const [versiculo, setVersiculo] = useState('');
    const [referencia, setReferencia] = useState('');

    // 🔹 Funções de gerar versículo (sem mudanças)
    const livros = [ /* ... seus livros ... */ ];

    const gerarVersiculo = async () => {
        const livro = livros[Math.floor(Math.random() * livros.length)];
        const capitulo = Math.floor(Math.random() * livro.capitulos) + 1;
        const versiculoNum = Math.floor(Math.random() * 20) + 1;

        try {
            const resposta = await fetch(`https://bible-api.com/${livro.nome}+${capitulo}:${versiculoNum}`);
            const dados = await resposta.json();

            const traducaoRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(dados.text)}&langpair=en|pt`);
            const traducaoData = await traducaoRes.json();

            const livroTraducaoRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(livro.nome)}&langpair=en|pt`);
            const livroTraducaoData = await livroTraducaoRes.json();

            const referenciaTraduzida = `${livroTraducaoData.responseData.translatedText} ${capitulo}:${versiculoNum}`;

            setVersiculo(traducaoData.responseData.translatedText);
            setReferencia(referenciaTraduzida);
        } catch (erro) {
            setVersiculo('Erro ao carregar versículo.');
            setReferencia('');
            console.error(erro);
        }
    };

    const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    useEffect(() => {
        gerarVersiculo();
    }, []);

    return (
        <DashboardContainer open={drawerOpen} drawerWidth={240}>
            <Grid
                container
                spacing={8}
                sx={{
                    flexWrap: isMobile ? "wrap" : "nowrap", // 🔹 nunca quebra no desktop
                }}
            >
                {/* Card 1 */}
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            height: '50vh',
                            width: '100%', // 🔹 deixa responsivo
                            p: 2,
                            boxShadow: 3,
                            borderRadius: 2,
                            bgcolor: theme.palette.light?.main || '#f5f5f5',
                        }}
                    >
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <SkipNext color="secondary" sx={{ fontSize: '40px' }} />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="secondaryText"
                                    color={theme.palette.textSecondary?.main || theme.palette.text.primary}
                                    fontSize="28px"
                                    fontWeight={600}
                                >
                                    Próximas Festividades
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                {/* Card 2 */}
                <Grid item xs={12} md={8}>
                    <Card
                        sx={{
                            height: '70vh',
                            width: '100%', // 🔹 deixa responsivo
                            p: 2,
                            boxShadow: 3,
                            borderRadius: 2,
                            bgcolor: theme.palette.light?.main || '#f5f5f5',
                        }}
                    >
                        <Grid container direction="column" spacing={2}>
                            <Grid item container alignItems="center" spacing={2}>
                                <Grid item>
                                    <MenuBook color="secondary" sx={{ fontSize: '40px' }} />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="secondaryText"
                                        color={theme.palette.textSecondary?.main || theme.palette.text.primary}
                                        fontSize="28px"
                                        fontWeight={600}
                                    >
                                        Liturgia Diária
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Box sx={{ position: 'relative', height: '100%' }}>
                                    <Typography
                                        variant="secondaryText"
                                        sx={{
                                            fontSize: '1.5rem',
                                            fontStyle: 'italic',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            px: 2,
                                            p: '10px 25px',
                                            boxSizing: 'border-box',
                                        }}
                                        color={theme.palette.textSecondary?.main || theme.palette.text.primary}
                                    >
                                        {capitalizeFirstLetter(versiculo) || 'Carregando versículo...'}
                                    </Typography>

                                    <Grid container justifyContent="center" alignItems="center" mt={5}>
                                        <img
                                            src={CruzEvangelho}
                                            alt="Cruz do Evangelho"
                                            style={{ width: '30%', height: '30%' }}
                                        />
                                    </Grid>

                                    <Typography
                                        variant="caption"
                                        sx={{
                                            position: 'absolute',
                                            mt: 2,
                                            right: 12,
                                            fontSize: '1.2rem',
                                            color: theme.palette.textSecondary?.main || '#555',
                                        }}
                                    >
                                        {referencia || ''}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </DashboardContainer>
    );
}
