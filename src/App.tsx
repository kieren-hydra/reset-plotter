import './App.css'
import { useStore } from './stores/useStore'

function App() {

    const count = useStore((state) => state.count)
    const increment = useStore((state) => state.increment)
    const reset = useStore((state) => state.reset)

  return (
    <>

      <h1>{count}</h1>
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
    </>
  )
}

export default App;
