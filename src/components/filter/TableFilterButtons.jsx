import {Button, CircularProgress, Grid, Stack} from "@mui/material";
import { FilterAlt, Restore } from '@mui/icons-material'

export function TableFilterButtons({ isLoading, handleClearFilters }) {
    return (
        <Grid item xs={12}>
            <Grid item xs={12} md={3} lg={4}>
                <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                    <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={16} sx={{ color: 'textSecondary' }} /> : <FilterAlt />}
                    >
                        Filtrar
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Restore />}
                        onClick={handleClearFilters}
                    >
                        Limpar Filtros
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
}