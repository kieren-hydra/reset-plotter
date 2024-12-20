import {Terminal} from "../../types/terminal.ts";
import ListItemContainer from "./ListItemContainer.tsx";
import DataStatus from "./DataStatus.tsx";

type TerminalItemProps = {
    terminalData: Terminal
    isSelected: boolean
}
const TerminalItem = ({terminalData, isSelected}: TerminalItemProps) => {

    const {name} = terminalData

    return (
        <ListItemContainer
            isSelected={isSelected}
        >
            <div className="flex gap-2 items-center">

                < i className="ri-map-pin-line"></i>
                <p>{name || "Unknown Terminal"}</p>
            </div>

            <DataStatus status={"unsaved"}/>
        </ListItemContainer>
    )
}

export default TerminalItem