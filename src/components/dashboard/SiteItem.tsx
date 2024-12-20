import {Site} from "../../types/site.ts";
import DataStatus from "./DataStatus.tsx";
import ListItemContainer from "./ListItemContainer.tsx";
import {useDashboardStore} from "../../stores/useDashBoardStore.ts";
import SiteEditor from "./SiteEditor.tsx";
import {useNavigate} from "react-router";

type SiteItemProps = {
    siteData: Site
}
const SiteItem = ({siteData}: SiteItemProps) => {

    const {name, id, terminals, boundary} = siteData

    const {selectedSiteId, setSelectedSiteId} = useDashboardStore()

    const navigate = useNavigate()

    const isSelected = id === selectedSiteId

    const handleClick = (isSelected: boolean, id: number) => {
        setSelectedSiteId(isSelected ? null : id);
        navigate(`/site/${id}`)
    }

    return (

        <div>
            <ListItemContainer
                isSelected={isSelected}
                handleClick={() => handleClick(isSelected, id)}>

                <div className="flex gap-2 items-center">

                    <i className="ri-map-2-line"></i>
                    <p>{name || "Unknown Site"}</p>
                </div>

                <DataStatus/>

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
