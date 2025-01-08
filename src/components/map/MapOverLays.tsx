import {useEditSiteStore} from "../../stores/useEditSiteStore.ts";
import PlottrButton from "../global/PlottrButton.tsx";
import UndoButton from "./UndoButton.tsx";

const MapOverLays = () => {

    const {
        companyName,
        siteName
    } = useEditSiteStore();

    return (
        <div data-cy="geofence-editor"
             className="absolute flex gap-2 bg-white mx-4 my-2 w-[calc(100%-32px)] rounded-lg p-4 text-gray">
            <div>
                <div className="flex gap-2 items-center">
                    <p>{companyName || "Unknown Company"}</p>
                    <i className="ri-arrow-right-s-line text-xl"></i>
                    <p>{siteName || "Unknown Company"}</p>
                </div>

                <h2>Geofence Editor</h2>
                <p>Click on the map to place at least three pins to define a boundary</p>
            </div>

            <div className="flex gap-2 justify-end grow items-end">
                <PlottrButton
                    handleClick={() => {
                        console.log("reload clicked")
                    }}
                    color="white"
                    label={"Reload from Live"}
                    icon={<i className="ri-restart-line text-xl text-orange"></i>}
                />

                <PlottrButton
                    handleClick={() => {
                        console.log("save clicked")
                    }}
                    color="orange"
                    label={"Save changes"}
                />

            </div>

            <div className="absolute bottom-[-3rem] left-0">
                <UndoButton/>
            </div>

        </div>
    )
}

export default MapOverLays