import React from 'react'
import { IPerson } from '../core/Person'
import { UseAppContext } from './ApplicationContext'
import Requirement from './Requirement'

const Person = ({ person }: { person: IPerson }) => {
    const { update } = UseAppContext()

    const executed = person.getExecutedReauirements()
    const actual = person.getActualRequirements()

    return (
        <div className="pdg bdr">
            <h2>Person</h2>
            <h3>{person.getName()}</h3>
            <div className="bdr pdg">
                wallet:
                {person.getWalletBalance()}
            </div>
            <div className="bdr pdg">
                {executed.length ? (
                    <div className="bdr pdg">
                        <h4>executed:</h4>
                        {person.getExecutedReauirements().map((requirement) => {
                            return (
                                <Requirement
                                    requirement={requirement}
                                    person={person}
                                />
                            )
                        })}
                    </div>
                ) : null}
                {actual.length ? (
                    <div className="bdr pdg">
                        <h4>actual:</h4>
                        {person.getActualRequirements().map((requirement) => {
                            return (
                                <Requirement
                                    requirement={requirement}
                                    person={person}
                                />
                            )
                        })}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Person
