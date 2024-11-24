import { useState } from 'react'
import './App.css'
import AppProvider, { UseAppContext } from './ui/ApplicationContext'
import AppMainComponent from './ui/AppMainComponent'

function App() {
    const [state, setState] = useState<number>(0)

    return (
        <div className="App">
            <AppProvider updateCB={() => setState((curr) => curr + 1)}>
                <AppMainComponent />
            </AppProvider>
        </div>
    )
}

export default App
