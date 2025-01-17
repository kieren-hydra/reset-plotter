import {useEditSiteStore} from "../../stores/useEditSiteStore.ts";
import PlottrButton from "../global/PlottrButton.tsx";
import UndoButton from "./UndoButton.tsx";
import {useSearchParams} from "react-router";
import useOnClickHandlers from "../../hooks/useOnClickHandlers.tsx";
import useMapMode from "../../hooks/useMapMode.tsx";
import useSavedStatus from "../../hooks/useSavedStatus.tsx";

const MapOverLays = () => {

    const {companyName, siteName} = useEditSiteStore();
    const [queryParams, setQueryParams] = useSearchParams();
    const {handleSaveBoundary} = useOnClickHandlers();
    const mapMode = useMapMode();
    const {boundaryIsSaved} = useSavedStatus();

    //TODO: add check for terminals saved status
    const saved = boundaryIsSaved;

    const handleReload = () => {
        queryParams.set("warning", "reload_live_boundary");
        setQueryParams(queryParams);
    }

    return (
        <div data-cy="geofence-editor"
             className="absolute flex gap-2 bg-white mx-4 my-2 w-[calc(100%-32px)] rounded-lg p-4 text-gray">
            <div>
                <div className="flex gap-2 items-center">
                    <p>{companyName || "Unknown Company"}</p>
                    <i className="ri-arrow-right-s-line text-xl"></i>
                    <p>{siteName || "Unknown Company"}</p>
                </div>

                <h2>{mapMode === "edit_boundary" ?  "Geofence Editor" : mapMode === "edit_terminals" ? "Terminal Editor" : "Pin Editor"}</h2>
                <p>Click on the map to place at least three pins to define a boundary</p>
            </div>

            <div className="flex gap-2 justify-end grow items-end">
                <PlottrButton
                    dataCy={"reload-btn"}
                    handleClick={handleReload}
                    color="white"
                    disabled={saved}
                    label={"Reload from Live"}
                    icon={<i className="ri-restart-line text-xl text-orange"></i>}
                />

                <PlottrButton
                    dataCy={"save-btn"}
                    handleClick={handleSaveBoundary}
                    color="orange"
                    label={"Save changes"}
                    disabled={saved}
                />

            </div>

            <div className="absolute bottom-[-3rem] left-0">
                <UndoButton/>
            </div>

        </div>
    )
}

export default MapOverLays