import {MapMode} from "../types/map-mode.ts";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router";

const useMapMode = () => {
    const [mapMode, setMapMode] = useState<MapMode>("view");
    const [queryParams] = useSearchParams();

    useEffect(() => {

        const mapModeParam = queryParams.get("map_mode");
        setMapMode(mapModeParam as MapMode || "view");

    }, [queryParams]);


    return {mapMode, setMapMode}
}

export default useMapMode