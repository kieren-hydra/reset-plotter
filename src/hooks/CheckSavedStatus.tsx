import useResetAPIData from "./useResetAPIData.tsx";
import {useEditSiteStore} from "../stores/useEditSiteStore.ts";
import {Boundary} from "../types/boundary.ts";
import {useSearchParams} from "react-router";
import {useEffect} from "react";

const UpdateSavedStatus = () => {
    const {singleSiteData} = useResetAPIData();
    const {siteBoundary} = useEditSiteStore();
    const apiSiteBoundary = singleSiteData?.boundary as Boundary || null;
    const [queryParams, setQueryParams] = useSearchParams();

    useEffect(() => {
        if(!apiSiteBoundary || siteBoundary) {
            queryParams.set("saved", "true")
        } else if (JSON.stringify(apiSiteBoundary) !== JSON.stringify(siteBoundary)) {
            queryParams.set("saved", "false")
        } else {
            queryParams.set("saved", "true")
        }
        setQueryParams(queryParams)
    }, [apiSiteBoundary, queryParams, setQueryParams, siteBoundary]);


    return null;
}

export default UpdateSavedStatus;