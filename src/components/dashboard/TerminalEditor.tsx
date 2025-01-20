import ghostIcon from "../../assets/icons/ghost-icon.svg";
import {Terminal} from "../../types/terminal.ts";

type TerminalEditorProps = {
    terminalData: Terminal | null;
}
const TerminalEditor = ({terminalData}: TerminalEditorProps) => {

    console.log("terminalCoords",terminalData)

    return (
        <>
            <div data-cy="site-editor"
                 className="my-4 mx-2 pb-4 flex flex-col gap-2 border-b border-b-gray-light">
                <p>Assign Terminals</p>
                <small className="text-gray-500">Enter coordinates or place it directly on the map.</small>
                <div className="flex justify-between">
                    <p className="text-orange">Ghost Terminal</p>
                    <img src={ghostIcon} alt="Ghost Icon"/>
                </div>
            </div>
        </>
    )
}

export default TerminalEditor;