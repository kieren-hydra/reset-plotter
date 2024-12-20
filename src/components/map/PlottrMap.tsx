import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import LoadingWheel from "../LoadingWheel.tsx";
import ErrorFallback from "../ErrorFallback.tsx";
import {ErrorBoundary} from "react-error-boundary";

const containerStyle = {
    height: "100%",
    flex: 1,
};

const center = {
    lat: 53.34819631399739, // Default latitude
    lng: -1.4875218170248719, // Default longitude
};

type GoogleMapComponentProps = {
    children: React.ReactNode,
    clickable: boolean,
};

// const GoogleMapComponent = ({children, clickable}: GoogleMapComponentProps) => {
    const PlottrMap = ({children, clickable}: GoogleMapComponentProps) => {

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
        if (clickable && event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            console.log("Lat:", lat, "Lng:", lng);
        }
    };

    return (
        <ErrorBoundary fallback={<ErrorFallback/>}>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onClick={handleMapClick}
            >
                {children}

            </GoogleMap>

        </ErrorBoundary>
    );
};

export default PlottrMap;

