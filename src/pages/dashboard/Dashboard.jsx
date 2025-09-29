import { useEffect, useState } from 'react';
import {Box, Card, Grid, Typography, useTheme, useMediaQuery, styled, Stack} from "@mui/material";
import { MenuBook, SkipNext } from "@mui/icons-material";
import CruzEvangelho from "../../assets/images/cruz_evangelho.png";
import { useApp } from "../../contexts/AppContext.jsx"; // 🔹 importa contexto do drawer

const ResponsiveCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    boxShadow: theme.shadows[3],
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.light?.main || '#f5f5f5',
    height: 'auto',
    minHeight: '200px',
    width: '100%',

    [theme.breakpoints.up('xs')]: {
        minHeight: '180px',
    },
    [theme.breakpoints.up('sm')]: {
        minHeight: '200px',
    },
    [theme.breakpoints.up('md')]: {
        minHeight: '220px',
    },
    [theme.breakpoints.up('lg')]: {
        minHeight: '240px',
    },
}));

const LiturgiaCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    boxShadow: theme.shadows[3],
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.light?.main || '#f5f5f5',
    height: 'auto',
    minHeight: '300px',
    width: '100%',

    [theme.breakpoints.up('xs')]: {
        minHeight: '280px',
    },
    [theme.breakpoints.up('sm')]: {
        minHeight: '320px',
    },
    [theme.breakpoints.up('md')]: {
        minHeight: '350px',
    },
    [theme.breakpoints.up('lg')]: {
        minHeight: '380px',
    },
}));

export default function Dashboard() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const { drawerOpen } = useApp(); // 🔹 pega se sidebar está aberto

    const [versiculo, setVersiculo] = useState('');
    const [referencia, setReferencia] = useState('');

    const livros = [
        { nome: "Genesis", capitulos: 50 },
        { nome: "Exodus", capitulos: 40 },
        { nome: "Leviticus", capitulos: 27 },
        { nome: "Numbers", capitulos: 36 },
        { nome: "Deuteronomy", capitulos: 34 },
        { nome: "Joshua", capitulos: 24 },
        { nome: "Judges", capitulos: 21 },
        { nome: "Ruth", capitulos: 4 },
        { nome: "1Samuel", capitulos: 31 },
        { nome: "2Samuel", capitulos: 24 },
        { nome: "1Kings", capitulos: 22 },
        { nome: "2Kings", capitulos: 25 },
        { nome: "1Chronicles", capitulos: 29 },
        { nome: "2Chronicles", capitulos: 36 },
        { nome: "Ezra", capitulos: 10 },
        { nome: "Nehemiah", capitulos: 13 },
        { nome: "Esther", capitulos: 10 },
        { nome: "Job", capitulos: 42 },
        { nome: "Psalms", capitulos: 150 },
        { nome: "Proverbs", capitulos: 31 },
        { nome: "Ecclesiastes", capitulos: 12 },
        { nome: "Song of Solomon", capitulos: 8 },
        { nome: "Isaiah", capitulos: 66 },
        { nome: "Jeremiah", capitulos: 52 },
        { nome: "Lamentations", capitulos: 5 },
        { nome: "Ezekiel", capitulos: 48 },
        { nome: "Daniel", capitulos: 12 },
        { nome: "Hosea", capitulos: 14 },
        { nome: "Joel", capitulos: 3 },
        { nome: "Amos", capitulos: 9 },
        { nome: "Obadiah", capitulos: 1 },
        { nome: "Jonah", capitulos: 4 },
        { nome: "Micah", capitulos: 7 },
        { nome: "Nahum", capitulos: 3 },
        { nome: "Habakkuk", capitulos: 3 },
        { nome: "Zephaniah", capitulos: 3 },
        { nome: "Haggai", capitulos: 2 },
        { nome: "Zechariah", capitulos: 14 },
        { nome: "Malachi", capitulos: 4 },
        { nome: "Matthew", capitulos: 28 },
        { nome: "Mark", capitulos: 16 },
        { nome: "Luke", capitulos: 24 },
        { nome: "John", capitulos: 21 },
        { nome: "Acts", capitulos: 28 },
        { nome: "Romans", capitulos: 16 },
        { nome: "1Corinthians", capitulos: 16 },
        { nome: "2Corinthians", capitulos: 13 },
        { nome: "Galatians", capitulos: 6 },
        { nome: "Ephesians", capitulos: 6 },
        { nome: "Philippians", capitulos: 4 },
        { nome: "Colossians", capitulos: 4 },
        { nome: "1Thessalonians", capitulos: 5 },
        { nome: "2Thessalonians", capitulos: 3 },
        { nome: "1Timothy", capitulos: 6 },
        { nome: "2Timothy", capitulos: 4 },
        { nome: "Titus", capitulos: 3 },
        { nome: "Philemon", capitulos: 1 },
        { nome: "Hebrews", capitulos: 13 },
        { nome: "James", capitulos: 5 },
        { nome: "1Peter", capitulos: 5 },
        { nome: "2Peter", capitulos: 3 },
        { nome: "1John", capitulos: 5 },
        { nome: "2John", capitulos: 1 },
        { nome: "3John", capitulos: 1 },
        { nome: "Jude", capitulos: 1 },
        { nome: "Revelation", capitulos: 22 }
    ];

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
        <Grid
            container
            spacing={3}
            justifyContent={isMobile ? "center" : "flex-start"}
            alignItems="flex-start"
            paddingTop={15}
            sx={{
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'center' : 'flex-start',
            }}
        >
            {/* Card de Próximas Festividades  */}
            <Grid
                item
                sx={{
                    width: isMobile ? '100%' : '30vw',
                    maxWidth: isMobile ? '80vw' : 'none',
                }}
            >
                <ResponsiveCard>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <SkipNext
                                color="secondary"
                                sx={{
                                    fontSize: { xs: 32, sm: 36, md: 40, lg: 44 },
                                }}
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography
                                variant="secondaryText"
                                color={theme.palette.textSecondary?.main || theme.palette.text.primary}
                                sx={{
                                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem' },
                                    fontWeight: 600,
                                }}
                            >
                                Próximas Festividades
                            </Typography>
                        </Grid>
                    </Grid>
                </ResponsiveCard>
            </Grid>

            {/* Card de Liturgia Diária */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    width: isMobile ? '90%' : '50vw',
                    maxWidth: isMobile ? '80vw' : 'none',
                }}
            >
                <LiturgiaCard>
                    <Grid container direction="column" spacing={2} sx={{ height: '100%' }}>
                        <Grid item container alignItems="center" spacing={2}>
                            <Grid item>
                                <MenuBook
                                    color="secondary"
                                    sx={{ fontSize: { xs: 32, sm: 36, md: 40, lg: 44 } }}
                                />
                            </Grid>
                            <Grid item xs>
                                <Typography
                                    variant="secondaryText"
                                    color={theme.palette.textSecondary?.main || theme.palette.text.primary}
                                    sx={{
                                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem' },
                                        fontWeight: 600,
                                    }}
                                >
                                    Liturgia Diária
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item sx={{ flexGrow: 1 }}>
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    variant="secondaryText"
                                    sx={{
                                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem', lg: '1.4rem' },
                                        fontStyle: 'italic',
                                        textAlign: 'center',
                                        padding: { xs: 2, sm: 3, md: 4 },
                                    }}
                                >
                                    {capitalizeFirstLetter(versiculo) || 'Carregando versículo...'}
                                </Typography>

                                <Grid container justifyContent="center" alignItems="center">
                                    <img
                                        src={CruzEvangelho}
                                        alt="Cruz do Evangelho"
                                        style={{
                                            width: isMobile ? '30%' : '25%',
                                            maxWidth: '120px',
                                            height: 'auto',
                                        }}
                                    />
                                </Grid>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        textAlign: 'right',
                                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                                        paddingRight: 2,
                                        color: theme.palette.textSecondary?.main || '#555',
                                    }}
                                >
                                    {referencia || ''}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </LiturgiaCard>
            </Grid>
        </Grid>
    );
}