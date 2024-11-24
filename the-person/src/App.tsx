import { useState } from 'react'
import './App.css'
import AppProvider from './ui/ApplicationContext'
import MainComponent from './ui/MainComponent'

function App() {


    const [state , setState] = useState<number>(0);

    return (
        <div className="App">
            <AppProvider updateCB={() => setState(curr => curr + 1)}>
                <MainComponent />
            </AppProvider>
        </div>
    )
}

export default App
