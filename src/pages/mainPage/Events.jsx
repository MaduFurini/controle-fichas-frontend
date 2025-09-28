import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box, Grid
} from "@mui/material";
import { FiltersButton } from "../../components/filter/FiltersButton.jsx";
import { useApp } from "../../contexts/AppContext.jsx";
import { useState } from "react";
import { TableFilter } from "../../components/filter/TableFilter.jsx";
import { Add } from "@mui/icons-material";

export function Events() {
    const { getEmpresaIdSession, setEmpresaIdSession } = useApp();

    const [isOpenFilters, setIsOpenFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState(0);
    const [openForm, setOpenForm] = useState(false);

    return (
        <Grid
            container
            spacing={3}               // mantém espaçamento entre itens
            sx={{
                pt: { xs: 2, md: 5 },   // padding top responsivo
                px: { xs: 2, md: 4 },   // padding horizontal responsivo
                width: '100%',
                maxWidth: 1200,          // centraliza conteúdo
                mx: 'auto',
                boxSizing: 'border-box', // evita overflow
            }}
        >
            {/* Header com filtros e botão */}
            <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <FiltersButton
                            isOpenFilters={isOpenFilters}
                            setIsOpenFilters={setIsOpenFilters}
                            activeFilters={activeFilters}
                        />
                    </Grid>

                    <Grid item>
                        <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                onClick={() => setOpenForm(true)}
                            >
                                Cadastrar Festividade
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            {/* Filtro de tabela */}
            <Grid item xs={12}>
                <TableFilter
                    isOpenFilters={isOpenFilters}
                    item={"Festividades"}
                />
            </Grid>

            {/* Tabela */}
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="Festividades">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Data de Início</TableCell>
                                <TableCell>Data de Fim</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* linhas da tabela */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
