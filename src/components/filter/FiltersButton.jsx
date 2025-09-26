import {
    Button,
    Typography
} from "@mui/material";
import { ExpandLess, ExpandMore, FilterList } from '@mui/icons-material';

export function FiltersButton({ isOpenFilters, setIsOpenFilters, activeFilters }) {
    return (
        <Button
            onClick={() => setIsOpenFilters(!isOpenFilters)}
            variant="outlined"
            startIcon={<FilterList />}
            endIcon={isOpenFilters ? <ExpandLess /> : <ExpandMore />}
        >
            Filtros

            {activeFilters > 0 &&
                <Typography variant='span' ml={0.5}>
                    ({activeFilters})
                </Typography>
            }
        </Button>
    )
}