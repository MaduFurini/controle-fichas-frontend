import React from "react";
import { PickersDay } from "@mui/x-date-pickers";
import classNames from "classnames";
import { StyledDayContainer } from "./styled.jsx";

const Day = ({
                 day,
                 isInRange,
                 startDate,
                 endDate,
                 onDateClick,
                 ...pickersDayProps
             }) => {
    const isHighlighted = isInRange(day);
    const isStart = !!startDate?.isSame(day, "day");
    const isEnd = !!endDate?.isSame(day, "day");

    return (
        <StyledDayContainer
            className={classNames({
                "day-start": isStart,
                "day-end": isEnd,
                "day-range": isHighlighted,
                rounded: isStart && isEnd,
                "highlighted-text": isStart || isEnd,
            })}
            key={day.toString()}
        >
            <PickersDay
                {...pickersDayProps}
                day={day}
                onClick={() => onDateClick(day)}
            />
        </StyledDayContainer>
    );
};

export default Day;