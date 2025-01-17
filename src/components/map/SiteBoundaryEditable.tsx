import {Polygon} from '@react-google-maps/api';
import {useParams, useSearchParams} from "react-router";
import useResetAPIData from "../../hooks/useResetAPIData.tsx";
import LoadingWheel from "../global/LoadingWheel.tsx";
import {useEditSiteStore} from "../../stores/useEditSiteStore.ts";
import {useEffect} from "react";

const SiteBoundaryEditable = () => {

    const {companyIdParam, siteIdParam} = useParams();
    const {singleSiteData, isLoading, error} = useResetAPIData(Number(companyIdParam), Number(siteIdParam));
    const [queryParams, setQueryParams]  = useSearchParams();
    const colour = "orange";

    //This param is triggered by the "Reload from live" button on modal- KACM
    const loadBoundary = queryParams.get("action") === "load_boundary";

    const {
        setSiteId,
        setSiteName,
        setSiteBoundary,
        siteBoundary,
        siteId,
        setCompanyName,
    } = useEditSiteStore()

    //This sets the site boundary in the store, unless it already exist in the store - KACM
    useEffect(() => {

        const existingBoundaryInStore = siteBoundary && siteId?.toString() === siteIdParam

        if (singleSiteData && (!existingBoundaryInStore || loadBoundary)) {
            const {name, id, boundary, parentCompanyName} = singleSiteData
            setSiteId(id)
            setSiteBoundary(boundary)
            setSiteName(name)
            setCompanyName(parentCompanyName)

            //removes the params set by the Reload from live modal - KACM
            queryParams.delete("action")

            //removes the param that allows the last action to be undone using the Undo... button - KACM
            queryParams.delete("undo_mode")
            setQueryParams(queryParams)
        }
    }, [singleSiteData, siteBoundary, siteId, siteIdParam, loadBoundary]);

    if (isLoading) {
        return <LoadingWheel size={"large"}/>
    }

    //TODO add error handling
    if (error) {
        console.error(error)
        return
    }

    if (siteBoundary) {

        return (
            <Polygon
                onClick={() => {
                }}
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