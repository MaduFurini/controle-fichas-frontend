import { Box, styled, TextField } from "@mui/material";

const textFieldOptions = {
    shouldForwardProp: (prop) => prop !== 'fontColor' && prop !== 'textFieldBgColor',
};

const DateRangePickerOptions = {
    shouldForwardProp: (prop) => prop !== 'hasError',
}

export const DateRangePickerStyled = styled("div", DateRangePickerOptions)(({ theme, hasError }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
    ".MuiInputBase-root": {
        cursor: "pointer",
    },
    overflow: "hidden",
    ".MuiOutlinedInput-notchedOutline": {
        borderWidth: "1px !important",
    },
    ".Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: hasError ? 'red !important' : `${theme.palette.primary.main} !important`,
    },
}));

export const DateRangeTextField = styled(TextField, textFieldOptions)(({ fontColor, textFieldBgColor }) => ({
    backgroundColor: textFieldBgColor,
    input: {
        color: fontColor,
    }
}));

export const CalenderLayoutContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    paddingLeft: 2,
    marginTop: 8,
    height: "320px",
    ".MuiDateCalendar-root": {
        height: "unset",
        ".MuiPickersDay-root, .MuiDayCalendar-weekDayLabel": {
            fontSize: "14px",
        },
        ".MuiPickersDay-dayOutsideMonth": {
            color: "#798191",
        },
    },
    ".toolbar-container": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        button: {
            textTransform: "unset",
            display: "block",
            minWidth: "unset",
        },
        ".toolbar-buttons": {
            maxHeight: "260px",
            overflowY: "scroll",
        },
        ".toolbar-button": {
            margin: "4px",
            border: "none",
            background: "none",
            color: theme.palette.grey[900],
            fontSize: 14,
            "&.disabled": {
                color: theme.palette.grey[500],
            },
            "&.selected": {
                borderRadius: "4px",
                backgroundColor: "##DBF4FF",
            },
            "&.reset-button": {
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: 14,
                "&.disabled": {
                    color: theme.palette.grey[500],
                },
            },
        },
    },
    ".calendar-header-container": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        button: { color: theme.palette.grey[900], svg: { fontSize: 14 } },
        ".year-label": {
            fontSize: 18,
            fontWeight: 700,
            textTransform: "capitalize",
            width: "160px",
        },
        ".month-change-btn": {
            fontSize: "16px",
        },
    },
    ".MuiPickersMonth-monthButton , .MuiPickersYear-yearButton": {
        "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: '#ffffff',
        },
    },
}));

export const StyledDayContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    "&.day-range": {
        backgroundColor: `${theme.palette.primary.main}20`,
    },
    "&.day-start": {
        borderRadius: "18px 0 0 18px",
    },
    "&.day-end": {
        borderRadius: "0 18px 18px 0",
    },
    "&.rounded": {
        borderRadius: "18px",
        backgroundColor: "transparent",
    },
    "&.highlighted-text": {
        ".MuiPickersDay-root": {
            backgroundColor: theme.palette.primary.main,
            color: '#ffffff',
        },
    },
}));
