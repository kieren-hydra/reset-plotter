import {Company} from "../../types/company.ts";
import DataStatus from "./DataStatus.tsx";
import {useDashboardStore} from "../../stores/useDashBoardStore.ts";
import ListItemContainer from "./ListItemContainer.tsx";
import SiteList from "./SiteList.tsx";
import {useNavigate} from "react-router";

type CompanyItemProps = {
    companyData: Company
}

const CompanyItem = ({companyData}: CompanyItemProps) => {
    const {name, id, sites} = companyData

    const {selectedCompanyId, setSelectedSiteId, setSelectedCompanyId} = useDashboardStore()

    const navigate = useNavigate()

    const isSelected = id === selectedCompanyId

    const handleClick = (isSelected: boolean) => {
        setSelectedCompanyId(isSelected ? null : id);
        setSelectedSiteId(null);

        //for testing
        navigate(`/`)
    }

    return (
        <div>
            <ListItemContainer
                isSelected={isSelected}
                handleClick={() => handleClick(isSelected)}>

                <div className="flex gap-2 items-center">

                    <i className="ri-building-2-line"></i>
                    <p>{name || "Unknown Company"}</p>
                </div>

                <DataStatus/>
            </ListItemContainer>

            {isSelected && <SiteList sites={sites}/>}

        </div>
    );
};

export default CompanyItem;
