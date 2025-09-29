import {
    Button,
    CircularProgress,
    Grid,
    Stack
} from '@mui/material'
import { FilterAlt, Restore } from '@mui/icons-material'

export function TableFilterButtons({ isLoading, handleClearFilters }) {
    return (
        <Grid container spacing={2}>
            <Grid item size={4}>
                <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={isLoading}
                    startIcon={
                        isLoading ? (
                            <CircularProgress size={16} sx={{ color: 'textSecondary' }} />
                        ) : (
                            <FilterAlt />
                        )
                    }
                >
                    Filtrar
                </Button>
            </Grid>

            <Grid item size={4}>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Restore />}
                    onClick={handleClearFilters}
                >
                    Limpar Filtros
                </Button>
            </Grid>
        </Grid>
    )
}