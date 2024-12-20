import {Terminal} from "../../types/terminal.ts";
import {useEffect, useRef, useState} from "react";
import {Boundary} from "../../types/boundary.ts";
import PlottrButton from "../global/PlottrButton.tsx";

type SiteEditorProps = {
    terminals: Terminal[],
    boundary: Boundary

}
const SiteEditor = ({terminals, boundary} : SiteEditorProps) => {

    const hasBoundary = boundary && boundary.length > 0

    return (
        <div className="my-4 mx-2 flex flex-col gap-2">
            <p>{hasBoundary ? "Edit Boundary" : "Add Boundary"}</p>
            <small className="text-gray-500">Click on the map to place at least three pins to define a boundary</small>
            <div className="flex justify-end">
            <PlottrButton
                handleClick={() => console.log("Geofence Editor")}
                label={"Geofence Editor"}
            />
            </div>
        </div>
    )
}

export default SiteEditor