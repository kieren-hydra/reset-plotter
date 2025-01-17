import {Link, useSearchParams} from "react-router";
import React from "react";
import useSavedStatus from "../../hooks/useSavedStatus.tsx";

type ListItemContainerProps = {
    isSelected: boolean
    children: React.ReactNode
    path?: string
    dataCy?: string
}
const ListItemContainer = ({isSelected, children, path, dataCy} : ListItemContainerProps) => {

    const [queryParams, setQueryParams] = useSearchParams();
    const { boundaryIsSaved } = useSavedStatus();

    //TODO will need to update  with check for terminal saved status - KACM
    const unSaved = !boundaryIsSaved

    const handleClick = (event : React.MouseEvent) => {
        if(unSaved) {
            event.preventDefault();
            queryParams.set('warning', 'unsaved_nav')
            queryParams.set('blocked_path', path || "")
            setQueryParams(queryParams)
        }
    }

    return (
        <div className="h-fit w-full">
            <Link
                data-cy={dataCy}
                className={`${isSelected ? "text-orange border-orange" : "text-gray border-transparent"} border rounded-md w-full px-2 py-4 flex justify-between cursor-pointer `}
                onClick={(event) => handleClick(event)}
                to={path ? path : ""}
            >
                {children}
            </Link>
        </div>
    )
}

export default ListItemContainer