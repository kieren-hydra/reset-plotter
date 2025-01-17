import {useEffect, useState} from "react";
import {MapMode} from "../types/map-mode.ts";
import {useSearchParams} from "react-router";

const useMapMode = () => {
    const [mapMode, setMapMode] = useState<MapMode>("view");
    const [queryParams, setQueryParams] = useSearchParams();

    useEffect(() => {
        const mapModeParam = queryParams.get("map_mode");

        if(!queryParams.has("map_mode")) {
            queryParams.set("map_mode", "view")
            setQueryParams(queryParams)
        }

        setMapMode(mapModeParam as MapMode || "view");
        
    }, [queryParams, setQueryParams]);
    
    return mapMode;
}

export default useMapMode;