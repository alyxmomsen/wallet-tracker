import { createContext, useEffect, useState } from 'react'

import './../App.css'
import { Facade, IFacade } from '../core/Facade'
import { Observer, RequirementsObserver } from '../core/Observer'
import { IRequirement } from '../core/Requirement'
import { IPerson } from '../core/Person'
import Requirement from './Requirement'
import AddRequirement from './AddRequirement'

export type TMainContext = {
    facade: IFacade
    update: () => void
}

const gameFacade = new Facade()
export const mainContext = createContext<TMainContext>({
    facade: gameFacade,
    update: () => {},
})

const MainComponent = () => {
    const [, setState] = useState(0)

    const [persons, setPersons] = useState<IPerson[]>(gameFacade.getPersons())
    const [isAddRequirementsFormOpen, setIsAddRequirementsFormOpen] =
        useState(false)

    useEffect(() => {
        const observer = new RequirementsObserver()
        const requirements: IRequirement[] = []

        persons.forEach((person) => {
            observer.addCallback(() => {
                setState((current) => current + 1)
            })
            // const personActualRequirements = person.getActualRequirements();
            // setActualRequirements([...actualRequirements , personActualRequirements]);
        })
    }, [])

    useEffect(() => {
        const observer = new Observer()

        const update = () => {
            persons.forEach((elem) => {})
            observer.update()
            window.requestAnimationFrame(update)
        }

        update()
    }, [])

    return (
        <mainContext.Provider
            value={{
                facade: gameFacade,
                update: () => setState((current) => current + 1),
            }}
        >
            <div className="pre--1 bdr pdg">
                <button
                    onClick={() => {
                        setIsAddRequirementsFormOpen(true)
                    }}
                >
                    add requirement
                </button>
                {isAddRequirementsFormOpen && persons.length && (
                    <AddRequirement person={persons[0]} />
                )}
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
                            <div className="bdr pdg flex-box">
                                {person.getName()}
                                {person.getActualRequirements().map((req) => {
                                    return (
                                        <Requirement
                                                    date={req.getFormatedStringDate()}
                                                    title={req.getTitle()}
                                            description={req.getBehaviorDescription()}
                                            person={person}
                                            requirement={req}
                                                />
                                            
                                        
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
