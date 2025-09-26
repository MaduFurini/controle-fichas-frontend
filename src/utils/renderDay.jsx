import {Typography} from "@mui/material";

export const renderDay = (day) => {
    switch (day) {
        case 'Do': return <Typography sx={{ color: 'red' }}>{day}</Typography>;
        default: return <Typography>{day}</Typography>;
    }
};