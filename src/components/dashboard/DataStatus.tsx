type DataStatusProps = {
    status: "no-data" | "saved" | "unsaved"
}
const DataStatus = ({status} : DataStatusProps) => {

    const statusMap = {
        "no-data": {text: "No Data", color: "bg-gray"},
        "saved": {text: "Saved", color: "bg-green"},
        "unsaved": {text: "Unsaved", color: "bg-orange"}
    }


    return (
        <div className={"flex gap-1 border border-gray-light rounded px-2 items-center"}>
            <div className={`${statusMap[status].color} rounded-full h-2 w-2`}></div>
            <small className={"text-gray-400"}>{statusMap[status].text}</small>
        </div>
    )
}

export default DataStatus