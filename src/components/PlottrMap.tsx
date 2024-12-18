import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%", // Adjust height as needed
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
        return <div>Error loading maps. Please try again later.</div>;
    }

    if (!isLoaded) {
        return <div>Loading Maps...</div>;
    }

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (clickable && event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            console.log("Lat:", lat, "Lng:", lng);
        }
    };

    return (
        <div className="h-full grow">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onClick={handleMapClick}
            >
                {children}

            </GoogleMap>
            {/*<GoogleMap*/}
            {/*    mapContainerStyle={containerStyle}*/}
            {/*    center={center}*/}
            {/*    zoom={15}*/}
            {/*    onClick={handleMapClick}*/}
            {/*/>*/}
        </div>
    );
};

export default PlottrMap;

