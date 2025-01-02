import {Company} from "../../types/company.ts";
import DataStatus from "./DataStatus.tsx";
import ListItemContainer from "./ListItemContainer.tsx";
import SiteList from "./SiteList.tsx";
import {useParams} from "react-router";

type CompanyItemProps = {
    companyData: Company
}

const CompanyItem = ({companyData}: CompanyItemProps) => {
    const {name, id, sites} = companyData

    const { companyIdParam } = useParams()

    const isSelected = id.toString() === companyIdParam

    const path = isSelected ? '/' : `/company/${id}`

    return (
        <div>
            <ListItemContainer
                isSelected={isSelected}
            path={path}
            >

                <div className="flex gap-2 items-center">

                    <i className="ri-building-2-line"></i>
                    <p>{name || "Unknown Company"}</p>

                </div>

                <DataStatus status={"saved"}/>
            </ListItemContainer>

            {isSelected && <SiteList sites={sites}/>}

        </div>
    );
};

export default CompanyItem;
