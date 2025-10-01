import { useEffect, useMemo, useState } from "react";
import { FormHelperText } from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers";
import { Event } from '@mui/icons-material';
import CustomCalendarHeader from "./CustomCalendarHeader.jsx";
import Layout from "./CustomCalendarLayout.jsx";
import Day from "./CustomCalendarDay.jsx";
import { DateRangePickerStyled, DateRangeTextField } from "./styled";
import { renderDay } from "../../utils/renderDay.jsx";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const isInRange = (date, startDate, endDate) => {
    if (!startDate || !endDate) return false;
    return date.isBetween(startDate, endDate, "day", "[]");
};

const formatDateRange = (startDate, endDate) => {
    const start = startDate ? dayjs(startDate) : null;
    const end = endDate ? dayjs(endDate) : null;

    if (start && end && !start.isSame(end, "day")) {
        return `${start.format("DD/MM/YYYY")} à ${end.format("DD/MM/YYYY")}`;
    }
    if (start) return start.format("DD/MM/YYYY");
    if (end) return end.format("DD/MM/YYYY");
    return "Selecionar Data/Período";
};


const DateRangePicker = ({ value, onChange, onReset, hasError = false, textFieldSize = 'small', bgColor = 'transparent', ...restProps }) => {
    const [startDate, setStartDate] = useState(value?.[0] || null);
    const [endDate, setEndDate] = useState(value?.[1] || null);
    const [open, setOpen] = useState(false);

    const formattedValue = useMemo(() => formatDateRange(startDate, endDate), [startDate, endDate]);

    const selectAndCloseCalendar = (start, end) => {
        if (start && !end) {
            end = start.clone();
        }
        onChange([start?.toISOString(), end?.toISOString()]);
        setOpen(false);
    };

    const handleToolbarAction = (start, end, action) => {
        setStartDate(start ? dayjs(start) : null);
        setEndDate(end ? dayjs(end) : null);
        if (action === "reset") {
            onReset();
        } else {
            selectAndCloseCalendar(start, end);
        }
    };

    const handleDateChange = (date) => {
        const selectedDate = dayjs(date);
        if (!startDate || endDate || (selectedDate && selectedDate.isBefore(startDate, "day"))) {
            setStartDate(selectedDate);
            setEndDate(null);
        } else {
            setEndDate(selectedDate);
            selectAndCloseCalendar(startDate, selectedDate);
        }
    };

    useEffect(() => {
        if (value) {
            setStartDate(value[0] ? dayjs(value[0]) : null);
            setEndDate(value[1] ? dayjs(value[1]) : null);
        }
    }, [value]);

    return (
        <DateRangePickerStyled hasError={hasError}>
            <DatePicker
                views={["month", "year", "day"]}
                reduceAnimations
                value={endDate || startDate || null}
                closeOnSelect={false}
                disableHighlightToday
                maxDate={dayjs().add(1, 'day')}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => selectAndCloseCalendar(startDate, endDate)}
                showDaysOutsideCurrentMonth
                dayOfWeekFormatter={renderDay}
                slotProps={{
                    textField: {
                        sx: { maxWidth: 0, width: 0, height: 0, opacity: 0, position: 'absolute' },
                        InputProps: { endAdornment: null },
                    }
                }}
                slots={{
                    day: (day) => (
                        <Day
                            {...day}
                            isInRange={(date) => isInRange(date, startDate, endDate)}
                            startDate={startDate}
                            endDate={endDate}
                            onDateClick={handleDateChange}
                        />
                    ),
                    calendarHeader: (props) => (
                        <CustomCalendarHeader
                            date={props.currentMonth}
                            onMonthChange={props.onMonthChange}
                            onViewChange={props.onViewChange}
                        />
                    ),
                    layout: (prop) => (
                        <Layout
                            startDate={startDate}
                            endDate={endDate}
                            handleToolbarAction={handleToolbarAction}
                        >
                            {prop.children}
                        </Layout>
                    ),
                }}
                {...restProps}
            />

            <DateRangeTextField
                fullWidth
                size={textFieldSize}
                value={formattedValue}
                onClick={() => { setOpen(true) }}
                fontColor={startDate || endDate ? "rgba(0, 0, 0, 0.84)" : "rgba(0, 0, 0, 0.54)"}
                textFieldBgColor={bgColor}
                InputProps={{ endAdornment: <Event sx={{ color: 'rgba(0, 0, 0, 0.54)' }} /> }}
                inputProps={{
                    ...DateRangeTextField.inputProps,
                    readOnly: true,
                    'aria-labelledby': 'date-range-picker',
                    'aria-required': false,
                }}
            />

            <FormHelperText sx={{ color: hasError ? 'red' : 'rgba(0, 0, 0, 0.54)' }}>
                {hasError ? 'Campo obrigatório ' : 'Selecione uma data ou período'}
            </FormHelperText>
        </DateRangePickerStyled>
    );
};

export default DateRangePicker;