import {Terminal} from "../../types/terminal.ts";

import TerminalItem from "./TerminalItem.tsx";

type TerminalListProps = {
    terminals: Terminal[],
}
const TerminalList = ({terminals} : TerminalListProps) => {

    return (
            <div>
                {terminals && terminals.length > 0 ? (
                    terminals.map((terminal: Terminal) => <TerminalItem isSelected={false} key={terminal.id} terminalData={terminal}/>)
                ) : (
                    <p>No terminals available.</p>
                )}
            </div>
    )
}

export default TerminalList