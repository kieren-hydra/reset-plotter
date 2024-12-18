import './App.css'
import {Routes, Route} from "react-router";
import PlottrLayout from "./components/PlottrLayout.tsx";
import SiteMap from "./components/SiteMap.tsx";


function App() {

    return (
        <Routes>
            <Route path="/" element={<PlottrLayout/>}/>

            <Route element={<PlottrLayout/>}>
                <Route path={"site/:siteId"} element={<SiteMap/>}/>
            </Route>
        </Routes>
    )
}

export default App;
