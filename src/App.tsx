import { useEffect, useState } from 'react'
import './App.css'

import AppContextProvider from './ui-v2/context/AppContextProvider'
import AppComponent from './ui-v2/AppComponent'

function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <AppComponent />
            </AppContextProvider>
        </div>
    )
}

export default App
