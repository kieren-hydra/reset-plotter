import {Site} from "../../types/site.ts";
import DataStatus from "./DataStatus.tsx";
import ListItemContainer from "./ListItemContainer.tsx";
import SiteEditor from "./SiteEditor.tsx";
import {useParams} from "react-router";

type SiteItemProps = {
    siteData: Site
}
const SiteItem = ({siteData}: SiteItemProps) => {

    const {name, id, terminals, boundary} = siteData

    const { companyIdParam, siteIdParam } = useParams()

    const isSelected = id.toString() === siteIdParam

    const path = isSelected ? `/company/${companyIdParam}` : `/company/${companyIdParam}/site/${id}`


    return (

        <div>
            <ListItemContainer
                isSelected={isSelected}
                path={path}
                dataCy="site-item"
            >

                <div className="flex gap-2 items-center">

                    <i className="ri-map-2-line"></i>
                    <p>{name || "Unknown Site"}</p>
                </div>

                <DataStatus status={"no-data"}/>

            </ListItemContainer>

            {isSelected &&
                <SiteEditor
                    terminals={terminals}
                    boundary={boundary}
                />}
        </div>

    )
}

export default SiteItem
