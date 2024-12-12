import './App.css'
import {useStore} from './stores/useStore'
import {useQuery} from '@tanstack/react-query';
import {webService} from './utils/api-utils.ts';


function App() {

    const testGet = async () => {
        const response = await webService.get<string>('/test');
        return response.data
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

            <h2>{isLoading ? 'Loading...' : 'Ready!'}</h2>
            <h2>{data}</h2>
            <h2>{error?.message}</h2>
        </>
    )
}

export default App;
