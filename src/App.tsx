import './App.css'
import {Routes, Route} from "react-router";
import PlottrLayout from "./components/PlottrLayout.tsx";
import SiteMap from "./components/SiteMap.tsx";
import {useQuery} from "@tanstack/react-query";
import {webService} from "./utils/api-utils.ts";
import {useEffect} from "react";


function App() {

    const testGet = async () => {
        return await webService.get('/test');
    }

    const {data} = useQuery({
        queryKey: ['test'],
        queryFn: testGet
    })

    useEffect(() => {
        if(data) {
            console.log("data",data)
        }
    }, [data]);

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
