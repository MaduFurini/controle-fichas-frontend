import {
    Button,
    Grid,
    Paper,
    Stack,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {FiltersButton} from "../../components/filter/FiltersButton.jsx";
import {useApp} from "../../contexts/AppContext.jsx";
import {useState} from "react";
import {TableFilter} from "../../components/filter/TableFilter.jsx";
import {Add, AddAlarm, AddAlert, Home as HomeIcon} from '@mui/icons-material';

export function Events() {
    const { getEmpresaIdSession, setEmpresaIdSession } = useApp();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [numTotalItems, setNumTotalItems] = useState(0);

    const [isOpenFilters, setIsOpenFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState(0);

    const [openForm, setOpenForm] = useState(false);

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={3}
        >
            <Grid item xs={12}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between">
                    <FiltersButton
                        isOpenFilters={isOpenFilters}
                        setIsOpenFilters={setIsOpenFilters}
                        activeFilters={activeFilters}
                    />

                    <Grid item xs={12} md={4}>
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
                    </Grid>
                </Stack>
            </Grid>

            <TableFilter
                isOpenFilters={isOpenFilters}
                // communities={communities}
                // isLoading={isOpenFilters}
                item={"Festividades"}
            />

            <Grid item xs={12}>
                <TableContainer component={Paper}>
                {/* TODO - Custom Export */}

                    <Table aria-label="Festividades">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Data de Início</TableCell>
                                <TableCell>Data de Fim</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}