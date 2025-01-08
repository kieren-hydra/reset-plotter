import PlottrButton from "../global/PlottrButton.tsx";
import {useEffect, useState} from "react";
import {useEditSiteStore} from "../../stores/useEditSiteStore.ts";
import {useSearchParams} from "react-router";

type UndoMode = "move_pin" | "delete_pin" | "add_pin" | null

const UndoButton = () => {

    const {
        setSiteBoundary,
        siteBoundary,
        lastPinLocation
    } = useEditSiteStore();

    const [undoMode, setUndoMode] = useState<UndoMode>(null)

    const [queryParams, setQueryParams] = useSearchParams();

    useEffect(() => {
        const undoModeParam = queryParams.get("undo_mode");
        setUndoMode(undoModeParam as UndoMode || null);
    }, [queryParams])

    const labelTextMap = {
        "move_pin": "Undo move pin",
        "delete_pin": "Undo delete pin",
        "add_pin": "Undo add pin"
    }

    const handleUndo = () => {
        if (undoMode === "add_pin") {
            setSiteBoundary(siteBoundary.slice(0, -1)); // Remove the last pin
        }

        if (undoMode === "move_pin" && lastPinLocation) {
            const updatedBoundary = [
                ...siteBoundary.slice(0, lastPinLocation.index),
                lastPinLocation.coords,
                ...siteBoundary.slice(lastPinLocation.index + 1)
            ];
            setSiteBoundary(updatedBoundary); // Restore the pin's previous location
        }

        if (undoMode === "delete_pin" && lastPinLocation) {
            const updatedBoundary = [
                ...siteBoundary.slice(0, lastPinLocation.index),
                lastPinLocation.coords,
                ...siteBoundary.slice(lastPinLocation.index)
            ];
            setSiteBoundary(updatedBoundary); // Add the deleted pin back
        }

        queryParams.delete("undo_mode");
        setQueryParams(queryParams);
        setUndoMode(null);
    };

    return (
            <PlottrButton
                dataCy="undo-btn"
                handleClick={handleUndo}
                label={undoMode ? labelTextMap[undoMode] : "Undo"}
                color={"white"}
                icon={<i className="ri-arrow-go-back-line"></i>}
                disabled={!undoMode}
            />
    )
}


export default UndoButton