import {useEditSiteStore} from "../../stores/useEditSiteStore.ts";
import {Marker} from "@react-google-maps/api";
import { createDynamicIcon } from '../../utils/map-utils.ts'
import {useSearchParams} from "react-router";

const SiteVertices = () => {

    const [searchParams, setQueryParams] = useSearchParams();

    const { siteBoundary } = useEditSiteStore()

    const handleClick = (index : number) => {
        setQueryParams({ ...Object.fromEntries(searchParams), map_mode: "edit_pin", pin_index: index.toString() });
    }

    return (
        <>
            {
                siteBoundary.map((vertex, index) => (
                    <Marker
                        key={index}
                        position={{ lat: vertex.lat, lng: vertex.lng }}
                        icon={createDynamicIcon(index)}
                        onClick={() => handleClick(index)}
                    />
                ))
            }
        </>

    )
}
export default SiteVertices