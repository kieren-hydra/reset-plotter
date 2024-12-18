import PlottrMap from "./PlottrMap.tsx";
import Dashboard from "./Dashboard.tsx";
import {Outlet} from "react-router";

const PlottrLayout = () => {
    return (
        <div className="h-full w-full flex">
            <Dashboard/>
            <PlottrMap clickable={true}>
                <Outlet/>
            </PlottrMap>
        </div>
    )
}

export default PlottrLayout