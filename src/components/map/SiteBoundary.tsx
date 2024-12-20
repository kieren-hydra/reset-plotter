import { Polygon } from '@react-google-maps/api';
import {useParams} from "react-router";
const SiteBoundary = () => {

    const siteId = useParams().siteId;

    const colour = "red";

    return (
        <Polygon
            onClick={() => {}}
            key={siteId}
            path={[
                {
                    "lat": 53.34819631399739,
                    "lng": -1.4875218170248719
                },
                {
                    "lat": 53.34884258009266,
                    "lng": -1.484346129770862
                },
                {
                    "lat": 53.34261647597055,
                    "lng": -1.4872692055387575
                },
                {
                    "lat": 53.345358707241274,
                    "lng": -1.4906484603312755
                }
            ]

            }
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
}

export default SiteBoundary