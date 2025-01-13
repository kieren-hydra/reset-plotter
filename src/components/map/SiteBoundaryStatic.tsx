import { Polygon } from '@react-google-maps/api';
import {useParams} from "react-router";
import useResetAPIData from "../../hooks/useResetAPIData.tsx";
import LoadingWheel from "../global/LoadingWheel.tsx";
import {useEffect, useState} from "react";
const SiteBoundaryStatic = () => {

    const {companyIdParam, siteIdParam} = useParams()
    const {singleSiteData, isLoading, error} = useResetAPIData(Number(companyIdParam), Number(siteIdParam))
    const [siteBoundary, setSiteBoundary] = useState([])
    const {boundary} = singleSiteData

    useEffect(() => {
        if(singleSiteData) {
        setSiteBoundary(boundary)
        }
    }, [boundary, singleSiteData, siteBoundary, setSiteBoundary]);

    const colour = "green";

    if (isLoading) {
        return <LoadingWheel size={"large"} />
    }

    if (error) {
        console.error(error)
        return
    }

    if(siteBoundary && siteBoundary.length > 0) {
        return (
            <Polygon
                onClick={() => {}}
                key={siteIdParam}
                path={singleSiteData.boundary}
                options={{
                    fillColor: colour,
                    fillOpacity: 0.4,
                    strokeColor: colour,
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
        return null
    }
}

export default SiteBoundaryStatic