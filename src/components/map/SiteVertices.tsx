import {useEditSiteStore} from "../../stores/useEditSiteStore.ts";
import {Marker} from "@react-google-maps/api";
import {createDynamicIcon} from '../../utils/map-utils.ts'
import {useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import {Boundary} from "../../types/boundary.ts";

const SiteVertices = () => {

    const [queryParams, setQueryParams] = useSearchParams();
    const {siteBoundary} = useEditSiteStore();
    const [vertices, setVertices] = useState<Boundary>([]);

    //useEffect and component state necessary to update numbers on the vertex pins - KACM
    useEffect(() => {
        setVertices(siteBoundary)
    }, [siteBoundary]);

    const handleClick = (index: number) => {
        queryParams.set("map_mode", "edit_pin");
        queryParams.set("pin_index", index.toString());
        setQueryParams(queryParams);
    }

    if(siteBoundary && vertices) {
        return (
            <>
                {
                    vertices.length > 0 && siteBoundary.map((vertex, index) => (
                        <Marker
                            key={index}
                            position={{lat: vertex.lat, lng: vertex.lng}}
                            icon={createDynamicIcon(index)}
                            onClick={() => handleClick(index)}
                        />
                    ))
                }
            </>
        )
    } else {
        return null;
    }


}
export default SiteVertices