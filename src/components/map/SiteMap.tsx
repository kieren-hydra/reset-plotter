import {useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import SiteBoundaryStatic from "./SiteBoundaryStatic.tsx";
import SiteVertices from "./SiteVertices.tsx";
import SiteBoundaryEditable from "./SiteBoundaryEditable.tsx";
import PinEditor from "./PinEditor.tsx";
import {MapMode} from "../../types/map-mode.ts";
import Terminals from "./Terminals.tsx";

const SiteMap = () => {
    const [queryParams] = useSearchParams();
    const [mapMode, setMapMode] = useState<MapMode>("view");

    useEffect(() => {
        const mapModeParam = queryParams.get("map_mode");
        setMapMode(mapModeParam as MapMode || "view");

    }, [queryParams]);

    return (
        <>
            {mapMode === "view" || mapMode === "edit_terminals" ?
                <SiteBoundaryStatic mapMode={mapMode}/>
                :
                <SiteBoundaryEditable/>
            }
            {mapMode !== "view" && mapMode !== "edit_terminals" && <SiteVertices/>}
            {mapMode === "edit_pin" && <PinEditor/>}
            {mapMode === "edit_terminals" && <Terminals />}
        </>
    );
};

export default SiteMap;
