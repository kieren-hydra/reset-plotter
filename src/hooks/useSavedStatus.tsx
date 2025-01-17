import {useEditSiteStore} from "../stores/useEditSiteStore.ts";
import useMapMode from "./useMapMode.tsx";
import {useMemo} from "react";
import useResetAPIData from "./useResetAPIData.tsx";
import {useParams} from "react-router";

const useSavedStatus = () => {
    const {companyIdParam, siteIdParam} = useParams();
    const { siteBoundary} = useEditSiteStore();
    const mapMode = useMapMode();
    const { singleSiteData} = useResetAPIData(Number(companyIdParam), Number(siteIdParam));

    const boundaryIsSaved = useMemo(() => {

        //boundary must always be considered true if the boundary edit is not open - KACM
        if(!mapMode || !["edit_boundary", "edit_pin"].includes(mapMode)) {
            return true;
        }

        //in boundary editor check for any differences between the API and local versions of the boundary
        if(mapMode && ["edit_boundary", "edit_pin"].includes(mapMode)){
            return JSON.stringify(siteBoundary) === JSON.stringify(singleSiteData?.boundary);
        }

        //default status is that saved equals true
        return true;

    }, [siteBoundary, mapMode, singleSiteData]);

    return {boundaryIsSaved};
}

export  default useSavedStatus;