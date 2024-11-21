import { createContext, useEffect, useState } from 'react'

import './../App.css'
import { Facade, IFacade } from '../core/Facade'
import { Observer, RequirementsObserver } from '../core/Observer'
import { IRequirement } from '../core/Requirement'
import { IPerson } from '../core/Person'

export type TMainContext = {
    facade: IFacade
}

const gameFacade = new Facade()
export const mainContext = createContext<TMainContext>({
    facade: gameFacade,
})

const MainComponent = () => {
    const [, setState] = useState(0)

    const [persons, setPersons] = useState<IPerson[]>(gameFacade.getPersons())

    useEffect(() => {
        const observer = new RequirementsObserver()
        const requirements: IRequirement[] = []

        persons.forEach((person) => {
            // observer.addCallback(() => {
            //
            // })
            // const personActualRequirements = person.getActualRequirements();
            // setActualRequirements([...actualRequirements , personActualRequirements]);
        })
    }, [])

    useEffect(() => {
        const observer = new Observer()

        const update = () => {
            persons.forEach((elem) => {})

            window.requestAnimationFrame(update)
        }

        update()
    }, [])

    return (
        <mainContext.Provider value={{ facade: gameFacade }}>
            <div className="pre--1 bdr pdg">
                <button
                    onClick={() => {
                        gameFacade.update()
                        setState((current) => current + 1)
                    }}
                >
                    update
                </button>
                {persons.map((person) => {
                    return (
                        <div className="bdr pdg">
                            {<button>btn</button>}wallet:
                            {person.getWalletBalance()}
                        </div>
                    )
                })}
                {persons.map((person) => {
                    if (person.getActualRequirements().length) {
                        return (
                            <div className="bdr pdg">
                                {person.getActualRequirements().map((req) => {
                                    return (
                                        <div className="bdr pdg">
                                            <h3>requires:</h3>
                                            <h4>
                                                {req.getFormatedStringDate()}
                                            </h4>
                                            <div>
                                                <p>{req.getTitle()}</p>
                                                <p>
                                                    {req.getBehaviorDescription()}
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        // req.go(person)
                                                    }}
                                                >
                                                    execute
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }

                    return false
                })}
            </div>
        </mainContext.Provider>
    )
}

export default MainComponent
