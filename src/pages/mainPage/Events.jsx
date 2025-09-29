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
import {EventForm} from "./forms/EventForm.jsx";

export function Events() {
    const { getEmpresaIdSession, setEmpresaIdSession } = useApp();

    const [isOpenFilters, setIsOpenFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState(0);
    const [openForm, setOpenForm] = useState(false);

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="end"
                paddingTop={15}
                spacing={3}
            >
                {/* Header com filtros e botão */}
                <Grid item size={12}>
                    <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={2} justifyContent={'space-between'}>
                        <FiltersButton
                            isOpenFilters={isOpenFilters}
                            setIsOpenFilters={setIsOpenFilters}
                            activeFilters={activeFilters}
                        />

                        <Typography sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                onClick={() => setOpenForm(true)}
                            >
                                Cadastrar Festividade
                            </Button>
                        </Typography>
                    </Stack>
                </Grid>

                <TableFilter
                    isOpenFilters={isOpenFilters}
                    item={"Festividades"}
                />

                {/* Tabela */}
                <Grid item size={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="Festividades">
                            <TableHead sx={{ bgcolor: "primary.main" }}>
                                <TableRow
                                    sx={{
                                        "& .MuiTableCell-root": {
                                            color: "white",
                                            fontWeight: "light",
                                            fontFamily: 'secondaryText.fontFamily',
                                            fontSize: "large",
                                        }
                                    }}
                                >
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

            <EventForm
                open={openForm}
                setOpen={setOpenForm}
            />
        </>
    );
}
