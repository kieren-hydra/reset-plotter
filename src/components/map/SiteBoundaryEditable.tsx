import { Polygon } from '@react-google-maps/api';
import {useParams} from "react-router";
import useResetAPIData from "../../hooks/useResetAPIData.tsx";
import LoadingWheel from "../LoadingWheel.tsx";
import {useEditSiteStore} from "../../stores/useEditSiteStore.ts";
import {useEffect} from "react";
const SiteBoundaryEditable = () => {

    const {companyIdParam, siteIdParam} = useParams()

    const {singleSiteData, isLoading, error} = useResetAPIData(Number(companyIdParam), Number(siteIdParam))

    const { setSiteId, setSiteName, setSiteBoundary, siteBoundary, siteId } = useEditSiteStore()

    const colour = "orange"

    //This sets the site boundary in the store, unless it already exist in the store - KACM
    useEffect(() => {

        const existingBoundaryInStore = siteBoundary && siteId?.toString() === siteIdParam

        if(singleSiteData && !existingBoundaryInStore) {
        const { name, id, boundary } = singleSiteData
        setSiteId(id)
        setSiteBoundary(boundary)
        setSiteName(name)
        }
    }, [setSiteBoundary, setSiteId, setSiteName, singleSiteData, siteBoundary, siteId, siteIdParam]);

    if (isLoading) {
        return <LoadingWheel size={"large"} />
    }

    //TODO add error handling
    if (error) {
        console.error(error)
        return
    }

    if (siteBoundary && siteBoundary.length > 2) {

        return (
            <Polygon
                onClick={() => {}}
                key={siteIdParam}
                path={siteBoundary}
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

export default SiteBoundaryEditable