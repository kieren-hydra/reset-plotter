import {Site} from "../../types/site.ts";
import {useMemo} from "react";
import useSavedStatus from "../../hooks/useSavedStatus.tsx";
import useMapMode from "../../hooks/useMapMode.tsx";

type DataStatusProps = {
    itemType: "company" | "site" | "terminal",
    siteData?: Site | null
    activeItem: boolean
};

type Status = "saved" | "unsaved" | "no-data";
const DataStatus = ({itemType, activeItem, siteData = null}: DataStatusProps) => {
    const {boundaryIsSaved} = useSavedStatus();
    const mapMode = useMapMode();

    const status: Status = useMemo(() => {

        switch (itemType) {
            case "company":
                return !activeItem || boundaryIsSaved ? "saved" : "unsaved";

            case "site": {
                const isViewOrTerminalMode = ["view", "edit_terminals"].includes(mapMode || "view");
                const hasBoundaryData = siteData?.boundary && siteData.boundary.length > 0;
                if (!activeItem || isViewOrTerminalMode || boundaryIsSaved) {
                    return hasBoundaryData ? "saved" : "no-data"
                }
                //Will return unsaved if it is an active item in boundary editor mode and the changes have not been saved - KACM
                return "unsaved";
            }

            case "terminal":
                //TODO: needs to be updated
                return "saved";

            default:
                return "saved"
        }

    }, [itemType, activeItem, boundaryIsSaved, mapMode, siteData?.boundary]);

    const statusMap = {
        "no-data": {text: "No Data", color: "bg-gray"},
        "saved": {text: "Saved", color: "bg-green"},
        "unsaved": {text: "Unsaved", color: "bg-orange"}
    };

    return (
        <div
            data-cy={`${itemType}-data-status`}
            className={"flex gap-1 border border-gray-light rounded px-2 items-center"}>
            <div className={`${statusMap[status].color} rounded-full h-2 w-2`}></div>
            <small className={"text-gray-400"}>{statusMap[status].text}</small>
        </div>
    )
}

export default DataStatus;