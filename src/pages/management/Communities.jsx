import React, { useState } from 'react';
import {
    Grid,
    Paper,
    TextField,
    IconButton,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Collapse, Typography
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterListIcon,
    FileDownload as FileDownloadIcon,
    Add as AddIcon,
    ArrowBackIosNew as ArrowBackIosNewIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import {useAlert} from "../../contexts/AlertContext.jsx";
import {useQueryClient} from "react-query";
import {TableFilter} from "../../components/filter/TableFilter.jsx";

export function Communities() {
    const { exibirAlerta } = useAlert();


    const [showFilters, setShowFilters] = useState(false);

    const items = Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        title: `Community ${i + 1}`,
        description: `Breve descrição do item ${i + 1}.`
    }));

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper variant="outlined" sx={{ minWidth: '85vw', minHeight: '80vh', p: 3, display: "flex", flexDirection: "column" }}>

                    {/* Linha de pesquisa + botões */}
                    <Grid container justifyContent="space-between" alignItems="center" marginBottom={3}>
                        <Grid item xs={9}>
                            <TextField
                                fullWidth
                                placeholder="Pesquisar..."
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <SearchIcon sx={{ mr: 1, opacity: 0.6 }} />,
                                }}
                            />
                        </Grid>

                        <Grid item xs={3} container justifyContent="flex-end" spacing={1}>
                            <Grid item>
                                <IconButton onClick={() => setShowFilters(!showFilters)}>
                                    <FilterListIcon color={showFilters ? "secondary" : "primary"} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <FileDownloadIcon color="primary" />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Button startIcon={<AddIcon />} variant="contained" color="primary">
                                    Novo
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Filtros extras */}
                    <Collapse in={showFilters} timeout="auto" unmountOnExit>
                        <TableFilter />
                    </Collapse>

                    {/* Tabela */}
                    <TableContainer component={Paper} variant="outlined" sx={{ flexGrow: 1 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: 'mainTransparent.main' }}>
                                    <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Título</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Descrição</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell align="right">
                                            <Button size="small" sx={{ mr: 1 }}>
                                                <EditIcon />
                                            </Button>
                                            <Button size="small">
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Paginação no final do Paper */}
                    <Grid container justifyContent="center" alignItems="center" spacing={2} marginTop={2}>
                        <Grid item>
                            <IconButton>
                                <ArrowBackIosNewIcon color='primary' fontSize="small" />
                            </IconButton>
                        </Grid>
                        {[1, 2, 3, 4, 5].map(num => (
                            <Grid item key={num}>
                                <Button>{num}</Button>
                            </Grid>
                        ))}
                        <Grid item>
                            <IconButton>
                                <ArrowForwardIosIcon color='primary' fontSize="small" />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="center" alignItems="center" spacing={2} marginTop={2}>
                        <Typography color='primary'>X registros</Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}
