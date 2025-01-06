import {useSearchParams} from "react-router";
import {useEditSiteStore} from "../../stores/useEditSiteStore.ts";
import {useEffect, useState} from "react";
import {Coordinate} from "../../types/coordinate.ts";
import {OverlayView} from "@react-google-maps/api";
import ClickAwayListener from "react-click-away-listener";

const PinEditor = () => {
    //This component will only be rendered if edit_pin is true in the query params - KACM

    const [queryParams, setQueryParams] = useSearchParams();
    const [pinCoords, setPinCoords] = useState<Coordinate | undefined>()

    const pinIndex = queryParams.get("pin_index");
    const {siteBoundary, setSiteBoundary} = useEditSiteStore();

    useEffect(() => {

        if (pinIndex && siteBoundary) {
            setPinCoords(siteBoundary[Number(pinIndex)])
        }

    }, [pinIndex, siteBoundary]);

    const handleClickMove = () => {
        setQueryParams({ ...Object.fromEntries(queryParams), map_mode: "move_pin" });
    }

    const handleClickDelete = () => {
        if (pinIndex !== null && siteBoundary) {
            const updatedBoundary = siteBoundary.filter((_, index) => index !== Number(pinIndex));
            setSiteBoundary(updatedBoundary);
            setQueryParams({ ...Object.fromEntries(queryParams), map_mode: "edit_boundary" });
        }
    };

    const handleClickAway = () => {
        setQueryParams({ ...Object.fromEntries(queryParams), map_mode: "edit_boundary" });
    }

    return (
        <>
            {pinCoords &&
                <OverlayView
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    position={pinCoords}
                    getPixelPositionOffset={() => ({x: 5, y: 5})}

                >
                    <ClickAwayListener onClickAway={handleClickAway}>
                    <div className="flex flex-col w-fit h-fit text-gray bg-white rounded-md p-2 border-gray-300 hover:bg-gray-50 whitespace-nowrap pointer-events-auto">

                        <button
                            className="flex gap-2 items-center border-b-2 border-gray-300 pb-1"
                            onClick={() => handleClickMove()}
                        >
                            <i className="ri-drag-move-2-fill text-xl"></i><p className="text-sm">Move Pin</p>
                        </button>

                        <button
                            className="flex gap-2 items-center pt-1"
                            onClick={() => handleClickDelete()}
                        >
                            <i className="ri-delete-bin-line text-xl"></i><p className="text-sm">Delete Pin</p>
                        </button>
                    </div>
                    </ClickAwayListener>
                </OverlayView>
            }
        </>
    )
}

export default PinEditor