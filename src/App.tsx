import { useState } from 'react'
import './App.css'
import AppContextProvider, { UseAppContext } from './ui/ApplicationContext'
import AppMainComponent from './ui/AppMainComponent'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router'

function App() {
    const [state, setState] = useState<number>(0)

    return (
        <div className="App">
            <div className="bdr pdg">
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div>
                                    <NavLink to={'/world'}>click</NavLink>hello
                                </div>
                            }
                        />
                        <Route
                            path="/world"
                            element={
                                <div>
                                    <Link to={'/'}>link</Link>world
                                </div>
                            }
                        />
                        <Route path="/foo" element={<div>foo</div>} />
                        <Route path="/bar" element={<div>bar</div>} />
                    </Routes>
                </BrowserRouter>
            </div>
            <AppContextProvider updateCB={() => setState((curr) => curr + 1)}>
                <AppMainComponent />
            </AppContextProvider>
        </div>
    )
}

export default App
