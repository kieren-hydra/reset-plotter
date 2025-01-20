import {Terminal} from "../../types/terminal.ts";
import {Boundary} from "../../types/boundary.ts";
import PlottrButton from "../global/PlottrButton.tsx";
import TerminalList from "./TerminalList.tsx";
import {useSearchParams} from "react-router";
import useMapMode from "../../hooks/useMapMode.tsx";

type SiteEditorProps = {
    terminals: Terminal[],
    boundary: Boundary

}
const SiteEditor = ({terminals, boundary}: SiteEditorProps) => {

    const hasBoundary = boundary && boundary.length > 0
    const [queryParams, setQueryParams] = useSearchParams();
    const mapMode = useMapMode();

    const handleClick = () => {
        queryParams.set("map_mode", "edit_boundary")
        queryParams.set("action" , "load_boundary")
        setQueryParams(queryParams);
    };

    return (
        <>
            <div data-cy="site-editor"
                 className="my-4 mx-2 pb-4 flex flex-col gap-2 border-b border-b-gray-light">
                <p>{hasBoundary ? "Edit Boundary" : "Add Boundary"}</p>
                <small className="text-gray-500">Click on the map to place at least three pins to define a
                    boundary</small>
                <div className="flex justify-end">

                    <PlottrButton
                        handleClick={handleClick}
                        label={"Geofence Editor"}
                        color="white"
                        disabled={!(mapMode === "view")}
                    />
                </div>
            </div>

            <div data-cy="terminal-list"
                 className="my-4 mx-2 pb-4 flex flex-col gap-2 border-b border-b-gray-light">
                <p>Available Terminals</p>

                <TerminalList terminals={terminals}/>

            </div>
        </>
    )
}

export default SiteEditor;