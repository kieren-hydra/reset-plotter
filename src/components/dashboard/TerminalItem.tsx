import {Terminal} from "../../types/terminal.ts";
import ListItemContainer from "./ListItemContainer.tsx";
import DataStatus from "./DataStatus.tsx";
import {useParams} from "react-router";
import TerminalEditor from "./TerminalEditor.tsx";

type TerminalItemProps = {
    terminalData: Terminal
}
const TerminalItem = ({terminalData}: TerminalItemProps) => {

    const {name, id} = terminalData;
    const {companyIdParam, siteIdParam, terminalIdParam } = useParams();
    const isSelected = id.toString() === terminalIdParam;

    const path = isSelected ?
        `/company/${companyIdParam}/site/${siteIdParam}`
        :
        `/company/${companyIdParam}/site/${siteIdParam}/terminal/${id}?map_mode=edit_terminals`;

    return (
        <>
            <ListItemContainer
                isSelected={isSelected}
                path={path}
            >
                <div className="flex gap-2 items-center">
                    < i className="ri-map-pin-line"></i>
                    <p>{name || "Unknown Terminal"}</p>
                </div>

                <DataStatus
                    itemType={"terminal"}
                    activeItem={isSelected}
                />
            </ListItemContainer>

            {isSelected &&
                <TerminalEditor terminalData={terminalData}/>
            }
        </>
    )
}

export default TerminalItem