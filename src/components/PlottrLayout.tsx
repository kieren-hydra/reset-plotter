import PlottrMap from "./map/PlottrMap.tsx";
import Dashboard from "./dashboard/Dashboard.tsx";
import {Outlet} from "react-router";

const PlottrLayout = () => {
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