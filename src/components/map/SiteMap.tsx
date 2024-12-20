import SiteBoundary from "./SiteBoundary.tsx";
import Terminals from "./Terminals.tsx";
import SiteVertices from "./SiteVertices.tsx";
import {useSearchParams} from "react-router";

const SiteMap = () => {

    const [queryParams] = useSearchParams()

    const editBoundary = queryParams.get("edit_boundary") === "true"

    return (
        <>
            {editBoundary &&
                <SiteBoundary/>
            }
            <SiteVertices/>
            <Terminals/>
        </>
    )
}

export default SiteMap