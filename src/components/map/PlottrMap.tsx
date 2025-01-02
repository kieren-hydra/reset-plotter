import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import {useSearchParams} from "react-router";
import LoadingWheel from "../LoadingWheel.tsx";
import ErrorFallback from "../ErrorFallback.tsx";
import {ErrorBoundary} from "react-error-boundary";
import {useEffect, useState} from "react";
import {useEditSiteStore} from "../../stores/useEditSiteStore.ts";
import MapOverLays from "./MapOverLays.tsx";

type GoogleMapComponentProps = {
    children: React.ReactNode,
};

const PlottrMap = ({children}: GoogleMapComponentProps) => {

    const [queryParams] = useSearchParams();
    const {setSiteBoundary, siteBoundary} = useEditSiteStore()
    const [boundaryEditorMode, setBoundaryEditorMode] = useState(false);

    useEffect(() => {
        const canEditBoundary = queryParams.get("edit_boundary") === "true";
        setBoundaryEditorMode(canEditBoundary);
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
        if (boundaryEditorMode && event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setSiteBoundary([...siteBoundary, {lat, lng}])
            console.log("Lat:", lat, "Lng:", lng);
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
        <ErrorBoundary fallback={<ErrorFallback/>}>

            <div className={"flex flex-1 w-full h-full relative"}>

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
                    }}
                >
                    {children}

                </GoogleMap>

                {boundaryEditorMode && <MapOverLays/>}

            </div>

        </ErrorBoundary>
    );
};

export default PlottrMap;

