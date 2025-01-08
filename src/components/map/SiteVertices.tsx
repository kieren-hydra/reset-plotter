import {useEditSiteStore} from "../../stores/useEditSiteStore.ts";
import {Marker} from "@react-google-maps/api";
import {createDynamicIcon} from '../../utils/map-utils.ts'
import {useSearchParams} from "react-router";

const SiteVertices = () => {

    const [queryParams, setQueryParams] = useSearchParams();

    const {siteBoundary} = useEditSiteStore()

    const handleClick = (index: number) => {
        queryParams.set("map_mode", "edit_pin");
        queryParams.set("pin_index", index.toString());
        setQueryParams(queryParams);
    }

    return (
        <>
            {
                siteBoundary.map((vertex, index) => (
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
}
export default SiteVertices