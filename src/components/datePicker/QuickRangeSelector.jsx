import { Button } from "@mui/material";
import classNames from "classnames";

const ToolbarButton = ({ label, disabled, action, onActionClick, className, selected = false }) => {
    return (
        <Button
            onClick={() => onActionClick(action)}
            className={classNames(className, "toolbar-button", {
                selected: selected,
            })}
            data-testid="quick-range-item"
            disabled={disabled}
        >
            {label}
        </Button>
    );
};

export default ToolbarButton;