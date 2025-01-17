import PlottrMap from "./map/PlottrMap.tsx";
import Dashboard from "./dashboard/Dashboard.tsx";
import {Outlet} from "react-router";
import {useEffect} from "react";
import useSavedStatus from "../hooks/useSavedStatus.tsx";

const PlottrLayout = () => {
    const {boundaryIsSaved} = useSavedStatus();

    useEffect(() => {
        console.log("boundary saved status: ", boundaryIsSaved)
    }, [boundaryIsSaved]);

    return (
        <div className="h-full w-full flex">
            <Dashboard/>
            <PlottrMap>
                <Outlet/>
            </PlottrMap>
        </div>
    )
}
export default PlottrLayout