import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import {useSearchParams} from "react-router";
import LoadingWheel from "../global/LoadingWheel.tsx";
import ErrorFallback from "../global/ErrorFallback.tsx";
import {ReactNode, useEffect, useState} from "react";
import {useEditSiteStore} from "../../stores/useEditSiteStore.ts";
import MapOverLays from "./MapOverLays.tsx";

type GoogleMapComponentProps = {
    children: ReactNode,
};

type MapMode = "view" | "edit_boundary" | "edit_pin" | "delete_pin" | "move_pin" | "edit_terminal";

const PlottrMap = ({children}: GoogleMapComponentProps) => {

    const [queryParams, setQueryParams] = useSearchParams();
    const {setSiteBoundary, siteBoundary, setLastPinLocation} = useEditSiteStore()
    const [MapMode, setMapMode] = useState<MapMode>("view");
    const [pinIndex, setPinIndex] = useState<number | null>(null);

    useEffect(() => {
        const mapModeParam = queryParams.get("map_mode");
        setMapMode(mapModeParam as MapMode || "view");

        const pinIndexParam = queryParams.get("pin_index");
        setPinIndex(pinIndexParam ? Number(pinIndexParam) : null);

    }, [queryParams]);

    // Load the Google Maps JavaScript API
    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    if (loadError) {
        return <ErrorFallback/>;
    }

    if (!isLoaded) {
        return <LoadingWheel size={"large"}/>;
    }

    const handleMapClick = (event: google.maps.MapMouseEvent) => {

        if (MapMode === "move_pin" && event.latLng && pinIndex != null) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();

            setLastPinLocation({index: pinIndex, coords: siteBoundary[pinIndex]})
            setSiteBoundary([...siteBoundary.slice(0, pinIndex), {lat, lng}, ...siteBoundary.slice(pinIndex + 1)])

            queryParams.set("map_mode", "edit_boundary");
            queryParams.set("undo_mode", "move_pin");
            queryParams.delete("pin_index");
            queryParams.set("saved", "false");
            setQueryParams(queryParams)
        }

        if (MapMode === "edit_boundary" && event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setSiteBoundary([...siteBoundary, {lat, lng}])

            queryParams.set("undo_mode", "add_pin");
            queryParams.set("saved", "false");
            setQueryParams(queryParams)
        }
    };

    const containerStyle = {
        height: "100%",
        width: "100%",
    };

    const center = {
        lat: 53.34819631399739, // Default latitude
        lng: -1.4875218170248719, // Default longitude
    };

    return (
        <div data-cy="google-map" className={"flex flex-1 w-full h-full relative"}>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onClick={handleMapClick}
                options={{
                    mapTypeControl: true, // Enable the map type control
                    mapTypeControlOptions: {
                        position: google.maps.ControlPosition.BOTTOM_LEFT,
                        style: google.maps.MapTypeControlStyle.DEFAULT,
                    },
                    draggableCursor: "crosshair",
                }}
            >
                {children}

            </GoogleMap>

            {MapMode !== "view" && <MapOverLays/>}

        </div>
    );
};

export default PlottrMap;

