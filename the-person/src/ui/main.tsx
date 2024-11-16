import React, { createContext, useEffect, useState } from 'react'

import './../App.css'
import { Facade, IFacade } from '../core/Facade'
// import { Facade, IFacade } from "../core/facade";

export type TMainContext = {
    facade: IFacade
}

const gameFacade = new Facade()
export const mainContext = createContext<TMainContext>({
    facade: gameFacade,
})

const Main = () => {
    const [, setState] = useState(0)

    useEffect(() => {}, [])

    useEffect(() => {
        console.log('updated')
    })

    return (
        <mainContext.Provider value={{ facade: gameFacade }}>
            <div className="pre--1 bdr">
                <button
                    onClick={() => {
                        gameFacade.getPersons().forEach((elem) => {
                            // elem.update()
                        })
                        setState((current) => current + 1)
                    }}
                >
                    update
                </button>
                {gameFacade.getPersons().map((person) => {
                    return (
                        <div className="bdr">
                            {<button>btn</button>}wallet:
                            {person.getWalletBalance()}
                        </div>
                    )
                })}
            </div>
        </mainContext.Provider>
    )
}

export default Main
