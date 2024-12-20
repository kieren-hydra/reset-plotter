import {Routes, Route, Outlet} from "react-router";
import PlottrLayout from "./components/PlottrLayout.tsx";
import SiteMap from "./components/map/SiteMap.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<PlottrLayout/>}/>

            <Route element={<PlottrLayout/>}>
                <Route path={"company/:companyId"} element={<Outlet />}>
                    <Route path={"site/:siteId"} element={<SiteMap/>}/>
                </Route>
            </Route>

        </Routes>
    )
}

export default App;
