import {Terminal} from "../../types/terminal.ts";
import {Boundary} from "../../types/boundary.ts";
import PlottrButton from "../global/PlottrButton.tsx";
import TerminalList from "./TerminalList.tsx";
import { useSearchParams } from "react-router";

type SiteEditorProps = {
    terminals: Terminal[],
    boundary: Boundary

}
const SiteEditor = ({terminals, boundary}: SiteEditorProps) => {

    const hasBoundary = boundary && boundary.length > 0

    const [searchParams, setSearchParams] = useSearchParams();

    const handleClick = () => {
        setSearchParams({ ...Object.fromEntries(searchParams), edit_boundary: "true" });
    }

    return (
        <>
            <div className="my-4 mx-2 pb-4 flex flex-col gap-2 border-b border-b-gray-light">
                <p>{hasBoundary ? "Edit Boundary" : "Add Boundary"}</p>
                <small className="text-gray-500">Click on the map to place at least three pins to define a
                    boundary</small>
                <div className="flex justify-end">
                    <PlottrButton
                        handleClick={handleClick}
                        label={"Geofence Editor"}
                    />
                </div>
            </div>

            <div className="my-4 mx-2 pb-4 flex flex-col gap-2 border-b border-b-gray-light">
                <p>Available Terminals</p>

                <TerminalList terminals={terminals}/>

            </div>
        </>
    )
}

export default SiteEditor