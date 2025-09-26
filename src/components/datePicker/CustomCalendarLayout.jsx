import classnames from "classnames";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { useEffect, useState } from "react";
import { CalenderLayoutContainer } from "./styled.jsx";
import ToolbarButton from "./QuickRangeSelector.jsx";

// Extensões necessárias para funcionalidades adicionais
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(quarterOfYear);

const today = dayjs();

const quickRanges = [
    {
        label: "Hoje",
        action: "today",
        start: today.startOf("day"),
        end: today.endOf("day"),
    },
    {
        label: "Ontem",
        action: "yesterday",
        start: today.subtract(1, "day").startOf("day"),
        end: today.subtract(1, "day").endOf("day"),
    },
    {
        label: "Última Semana",
        action: "lastWeek",
        start: today.subtract(1, "week").startOf("week"),
        end: today.subtract(1, "week").endOf("week"),
    },
    {
        label: "Esta Semana",
        action: "currentWeek",
        start: today.startOf("week"),
        end: today.endOf("week"),
    },
    {
        label: "Último Mês",
        action: "lastMonth",
        start: today.subtract(1, "month").startOf("month"),
        end: today.subtract(1, "month").endOf("month"),
    },
    {
        label: "Este Mês",
        action: "currentMonth",
        start: today.startOf("month"),
        end: today.endOf("month"),
    },
    {
        label: "Último Trimestre",
        action: "lastQuarter",
        start: today.subtract(1, "quarter").startOf("quarter"),
        end: today.subtract(1, "quarter").endOf("quarter"),
    },
    {
        label: "Este Trimestre",
        action: "currentQuarter",
        start: today.startOf("quarter"),
        end: today.endOf("quarter"),
    },
];

const Layout = ({ handleToolbarAction, children, startDate, endDate }) => {
    const [selectedToolbarAction, setSelectedToolbarAction] = useState(null);

    const handleQuickRangeChange = (action) => {
        const range = quickRanges.find((range) => range.action === action);
        handleToolbarAction(range?.start || null, range?.end || null, action);
    };

    useEffect(() => {
        const selectedRange = quickRanges.find(
            ({ start, end }) =>
                startDate?.isSame(start, "day") && endDate?.isSame(end, "day")
        );
        setSelectedToolbarAction(selectedRange?.action || null);
    }, [startDate, endDate]);

    return (
        <CalenderLayoutContainer>
            <div className="toolbar-container" data-testid="quick-range-container">
                <div className='toolbar-buttons'>
                    {quickRanges.map(({ label, action }) => (
                        <ToolbarButton
                            key={action}
                            label={label}
                            selected={selectedToolbarAction === action}
                            action={action}
                            onActionClick={handleQuickRangeChange}
                        />
                    ))}
                </div>
                <ToolbarButton
                    className={classnames("reset-button", {
                        disabled: !startDate && !endDate,
                    })}
                    label="Limpar"
                    action="reset"
                    onActionClick={handleQuickRangeChange}
                    disabled={!startDate && !endDate}
                />
            </div>
            {children}
        </CalenderLayoutContainer>
    );
};

export default Layout;