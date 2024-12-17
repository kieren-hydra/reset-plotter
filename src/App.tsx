import './App.css'
import {useStore} from './stores/useStore'
import {useQuery} from '@tanstack/react-query';
import {webService} from './utils/api-utils.ts';
import {Routes, Route} from "react-router";
import Home from './components/Home';
import Test from './components/Test';

function App() {

    const testGet = async () => {
        return await webService.get('/test');
    }

    const {data, error, isLoading} = useQuery({
        queryKey: ['test'],
        queryFn: testGet
    })

    const count = useStore((state) => state.count)
    const increment = useStore((state) => state.increment)
    const reset = useStore((state) => state.reset)

    return (
        <>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={reset}>Reset</button>

            <h2 className={"m-16"}>{isLoading ? 'Loading...' : 'Ready!!'}</h2>
            <h2>{data?.message}</h2>
            <h2>{error?.message}</h2>


            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/test'} element={<Test/>}/>
            </Routes>
        </>
    )
}

export default App;
