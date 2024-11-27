import { useState } from 'react'
import './App.css'
import AppContextProvider, { UseAppContext } from './ui/ApplicationContext'
import AppMainComponent from './ui/AppMainComponent'

function App() {
    const [state, setState] = useState<number>(0)

    return (
        <div className="App">
            <AppContextProvider updateCB={() => setState((curr) => curr + 1)}>
                <AppMainComponent />
            </AppContextProvider>
        </div>
    )
}

export default App
