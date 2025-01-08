import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SiteBoundaryStatic from "./SiteBoundaryStatic.tsx";
import SiteVertices from "./SiteVertices.tsx";
import SiteBoundaryEditable from "./SiteBoundaryEditable.tsx";
import PinEditor from "./PinEditor.tsx";
import {MapMode} from "../../types/map-mode.ts";

const SiteMap = () => {
    const [queryParams] = useSearchParams();
    const [mapMode, setMapMode] = useState<MapMode>("view");

    useEffect(() => {
        const mapModeParam = queryParams.get("map_mode");
        setMapMode(mapModeParam as MapMode || "view");

    }, [queryParams]);

    return (
        <>
            {mapMode === "view" ? <SiteBoundaryStatic /> : <SiteBoundaryEditable />}
            {mapMode !== "view" && <SiteVertices />}
            {mapMode === "edit_pin" && <PinEditor />}
            {/*<Terminals />*/}
        </>
    );
};

export default SiteMap;
