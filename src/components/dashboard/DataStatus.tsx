import {Site} from "../../types/site.ts";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router";

type DataStatusProps = {
    itemType: "company" | "site" | "terminal",
    siteData?: Site
    activeItem: boolean
};

type Status = "saved" | "unsaved" | "no-data"
const DataStatus = ({itemType, activeItem, siteData}: DataStatusProps) => {

    const [status, setStatus] = useState<Status>("saved");
    const [queryParams] = useSearchParams();

    useEffect(() => {
        const isNotSaved = queryParams.has("saved") && queryParams.get("saved") === "false";
        if (itemType === "company" && activeItem) {
            setStatus(isNotSaved ? "unsaved" : "saved");
        } else if (itemType === "site" && siteData) {
            if (isNotSaved && activeItem) {
                setStatus("unsaved");
            } else if (siteData.boundary.length === 0) {
                setStatus("no-data");
            } else {
                setStatus("saved");
            }
        }
    }, [itemType, queryParams, activeItem, siteData]);


    const statusMap = {
        "no-data": {text: "No Data", color: "bg-gray"},
        "saved": {text: "Saved", color: "bg-green"},
        "unsaved": {text: "Unsaved", color: "bg-orange"}
    };

    return (
        <div
            data-cy={`${itemType}-data-status`}
            className={"flex gap-1 border border-gray-light rounded px-2 items-center"}>
            <div className={`${statusMap[status].color} rounded-full h-2 w-2`}></div>
            <small className={"text-gray-400"}>{statusMap[status].text}</small>
        </div>
    )
}

export default DataStatus;