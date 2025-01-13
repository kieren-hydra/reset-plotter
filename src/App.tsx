import {Routes, Route, Outlet} from "react-router";
import PlottrLayout from "./components/PlottrLayout.tsx";
import SiteMap from "./components/map/SiteMap.tsx";
import Modals from "./components/modals/Modals.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<PlottrLayout/>}/>

                <Route element={<PlottrLayout/>}>
                    <Route path={"company/:companyIdParam"} element={<Outlet/>}>
                        <Route path={"site/:siteIdParam"} element={<SiteMap/>}/>
                    </Route>
                </Route>

            </Routes>

            <Modals/>
        </>
    )
}

export default App;
