import { useEffect, useState } from 'react';
import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import {Image, MenuBook, SkipNext} from "@mui/icons-material";
import CruzEvangelho from "../../assets/images/cruz_evangelho.png"

export default function Dashboard() {
    const theme = useTheme();
    const [versiculo, setVersiculo] = useState('');
    const [referencia, setReferencia] = useState('');

    const livros = [
        { nome: 'Genesis', capitulos: 50 },
        { nome: 'Exodus', capitulos: 40 },
        { nome: 'Leviticus', capitulos: 27 },
        { nome: 'Numbers', capitulos: 36 },
        { nome: 'Deuteronomy', capitulos: 34 },
        { nome: 'Joshua', capitulos: 24 },
        { nome: 'Judges', capitulos: 21 },
        { nome: 'Ruth', capitulos: 4 },
        { nome: '1 Samuel', capitulos: 31 },
        { nome: '2 Samuel', capitulos: 24 },
        { nome: '1 Kings', capitulos: 22 },
        { nome: '2 Kings', capitulos: 25 },
        { nome: '1 Chronicles', capitulos: 29 },
        { nome: '2 Chronicles', capitulos: 36 },
        { nome: 'Ezra', capitulos: 10 },
        { nome: 'Nehemiah', capitulos: 13 },
        { nome: 'Esther', capitulos: 10 },
        { nome: 'Job', capitulos: 42 },
        { nome: 'Psalms', capitulos: 150 },
        { nome: 'Proverbs', capitulos: 31 },
        { nome: 'Ecclesiastes', capitulos: 12 },
        { nome: 'Song of Solomon', capitulos: 8 },
        { nome: 'Isaiah', capitulos: 66 },
        { nome: 'Jeremiah', capitulos: 52 },
        { nome: 'Lamentations', capitulos: 5 },
        { nome: 'Ezekiel', capitulos: 48 },
        { nome: 'Daniel', capitulos: 12 },
        { nome: 'Hosea', capitulos: 14 },
        { nome: 'Joel', capitulos: 3 },
        { nome: 'Amos', capitulos: 9 },
        { nome: 'Obadiah', capitulos: 1 },
        { nome: 'Jonah', capitulos: 4 },
        { nome: 'Micah', capitulos: 7 },
        { nome: 'Nahum', capitulos: 3 },
        { nome: 'Habakkuk', capitulos: 3 },
        { nome: 'Zephaniah', capitulos: 3 },
        { nome: 'Haggai', capitulos: 2 },
        { nome: 'Zechariah', capitulos: 14 },
        { nome: 'Malachi', capitulos: 4 },
        { nome: 'Matthew', capitulos: 28 },
        { nome: 'Mark', capitulos: 16 },
        { nome: 'Luke', capitulos: 24 },
        { nome: 'John', capitulos: 21 },
        { nome: 'Acts', capitulos: 28 },
        { nome: 'Romans', capitulos: 16 },
        { nome: '1 Corinthians', capitulos: 16 },
        { nome: '2 Corinthians', capitulos: 13 },
        { nome: 'Galatians', capitulos: 6 },
        { nome: 'Ephesians', capitulos: 6 },
        { nome: 'Philippians', capitulos: 4 },
        { nome: 'Colossians', capitulos: 4 },
        { nome: '1 Thessalonians', capitulos: 5 },
        { nome: '2 Thessalonians', capitulos: 3 },
        { nome: '1 Timothy', capitulos: 6 },
        { nome: '2 Timothy', capitulos: 4 },
        { nome: 'Titus', capitulos: 3 },
        { nome: 'Philemon', capitulos: 1 },
        { nome: 'Hebrews', capitulos: 13 },
        { nome: 'James', capitulos: 5 },
        { nome: '1 Peter', capitulos: 5 },
        { nome: '2 Peter', capitulos: 3 },
        { nome: '1 John', capitulos: 5 },
        { nome: '2 John', capitulos: 1 },
        { nome: '3 John', capitulos: 1 },
        { nome: 'Jude', capitulos: 1 },
        { nome: 'Revelation', capitulos: 22 }
    ];

    const gerarVersiculo = async () => {
        const livro = livros[Math.floor(Math.random() * livros.length)];
        const capitulo = Math.floor(Math.random() * livro.capitulos) + 1;
        const versiculoNum = Math.floor(Math.random() * 20) + 1;

        try {
            // Buscar versículo
            const resposta = await fetch(`https://bible-api.com/${livro.nome}+${capitulo}:${versiculoNum}`);
            const dados = await resposta.json();

            // Traduzir texto do versículo
            const traducaoRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(dados.text)}&langpair=en|pt`);
            const traducaoData = await traducaoRes.json();

            // Traduzir nome do livro (livro + capítulo)
            const livroTraducaoRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(livro.nome)}&langpair=en|pt`);
            const livroTraducaoData = await livroTraducaoRes.json();

            // Monta referência traduzida
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
        <Box sx={{ width: '100%', height: '100%', pl: 5, pt: 15, boxSizing: 'border-box' }}>
            <Grid container spacing={16}>
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            height: '50vh',
                            width: '30vw',
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
                                    variant="textSecondary"
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

                <Grid item xs={12} md={8}>
                    <Card
                        sx={{
                            height: '70vh',
                            width: '50vw',
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
                                        variant="textSecondary"
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
                                    {/* Versículo em itálico e centralizado */}
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontSize: '3rem',
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

                                    <Grid
                                        container
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        mt={10}
                                    >
                                        <img
                                            src={CruzEvangelho}
                                            alt="Cruz do Evangelho"
                                            style={{ width: '50%', height: '50%' }}
                                            color={theme.palette.textSecondary.main}
                                        />
                                    </Grid>

                                    {/* Referência no canto inferior direito */}
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
        </Box>
    );
}
