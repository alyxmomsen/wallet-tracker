import React, { createContext, useEffect, useMemo, useState } from 'react'

import './../App.css'
import { Facade, IFacade } from '../core/Facade'
import { RequirementsObserver } from '../core/Observer'
import { IRequirement } from '../core/Requirement'
// import { Facade, IFacade } from "../core/facade";

export type TMainContext = {
    facade: IFacade
}

const gameFacade = new Facade()
export const mainContext = createContext<TMainContext>({
    facade: gameFacade,
})

const MainComponent = () => {
    const [, setState] = useState(0)
    const [actualRequirements, setActualRequirements] = useState<
        IRequirement[]
    >([])

    const result = useMemo(() => {}, [])

    useEffect(() => {
        const observer = new RequirementsObserver()

        gameFacade.getPersons().forEach((person) => {
            observer.addCallback(() => {
                // setActualRequirements(
                //     person.getActualRequirements()
                // );
            })
        })

        const update = () => {
            observer.update()

            console.log('update..')
            window.requestAnimationFrame(update)
        }

        // window.requestAnimationFrame(update)

        update()

        observer.update()

        console.log(gameFacade)
    }, [])

    useEffect(() => {
        console.log(gameFacade)
    })

    return (
        <mainContext.Provider value={{ facade: gameFacade }}>
            <div className="pre--1 bdr">
                <button
                    onClick={() => {
                        gameFacade.update()
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
                {actualRequirements.map((elem) => (
                    <div>requirement</div>
                ))}
            </div>
        </mainContext.Provider>
    )
}

export default MainComponent
