import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SiteBoundaryStatic from "./SiteBoundaryStatic.tsx";
import Terminals from "./Terminals.tsx";
import SiteVertices from "./SiteVertices.tsx";
import SiteBoundaryEditable from "./SiteBoundaryEditable.tsx";

const SiteMap = () => {
    const [queryParams] = useSearchParams();
    const [editBoundary, setEditBoundary] = useState(false);

    useEffect(() => {
        const isEditBoundary = queryParams.get("edit_boundary") === "true";
        setEditBoundary(isEditBoundary);
    }, [queryParams]);

    return (
        <>
            {editBoundary ? <SiteBoundaryEditable /> : <SiteBoundaryStatic />}
            <SiteVertices />
            <Terminals />
        </>
    );
};

export default SiteMap;
