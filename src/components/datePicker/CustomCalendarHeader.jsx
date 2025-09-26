import React from "react";
import { Button, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';

const CustomCalendarHeader = ({ date, onMonthChange, onViewChange }) => {
    const handleMonthOrYearChange = (unit, amount, direction) => {
        onMonthChange(date.clone().add(amount, unit), direction);
    };

    return (
        <div className="calendar-header-container">
            <IconButton
                onClick={() => handleMonthOrYearChange("year", -1, "left")}
                data-testid="prev-year-btn"
            >
                <KeyboardDoubleArrowLeft />
            </IconButton>
            <IconButton
                onClick={() => handleMonthOrYearChange("month", -1, "left")}
                data-testid="prev-month-btn"
            >
                <ChevronLeft />
            </IconButton>
            <Button
                className="year-label"
                onClick={() => onViewChange?.("month")}
                data-testid="select-year-btn"
            >
                {date.format("MMMM YYYY")}
            </Button>
            <IconButton
                onClick={() => handleMonthOrYearChange("month", 1, "right")}
                data-testid="next-month-btn"
            >
                <ChevronRight />
            </IconButton>
            <IconButton
                onClick={() => handleMonthOrYearChange("year", 1, "right")}
                data-testid="next-year-btn"
            >
                <KeyboardDoubleArrowRight />
            </IconButton>
        </div>
    );
};

export default CustomCalendarHeader;