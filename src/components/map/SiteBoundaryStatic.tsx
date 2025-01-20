import { Polygon } from '@react-google-maps/api';
import {useParams} from "react-router";
import useResetAPIData from "../../hooks/useResetAPIData.tsx";
import LoadingWheel from "../global/LoadingWheel.tsx";
import {useEffect, useState} from "react";
import {MapMode} from "../../types/map-mode.ts";

type SiteBoundaryStaticProps = {
    mapMode: MapMode
}
const SiteBoundaryStatic = ({mapMode} : SiteBoundaryStaticProps) => {

    const {companyIdParam, siteIdParam} = useParams();
    const {singleSiteData, isLoading, error} = useResetAPIData(Number(companyIdParam), Number(siteIdParam));
    const [siteBoundary, setSiteBoundary] = useState([]);
    const {plottrData: boundary} = singleSiteData;

    useEffect(() => {
        if(boundary) {
        setSiteBoundary(boundary)
        }
    }, [boundary, siteBoundary, setSiteBoundary]);

    const color = mapMode === "edit_terminals" ? "orange" : "green";

    if (isLoading) {
        return <LoadingWheel size={"large"} />;
    }

    if (error) {
        console.error(error)
        return;
    }

    if(siteBoundary && siteBoundary.length > 0) {
        return (
            <Polygon
                onClick={() => {}}
                key={siteIdParam}
                path={siteBoundary}
                options={{
                    fillColor: color,
                    fillOpacity: 0.4,
                    strokeColor: color,
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    geodesic: false,
                    zIndex: 1,
                }}
            />
        )
    } else {
        return null;
    }
}

export default SiteBoundaryStatic