import React from 'react'
import { IPerson } from '../core/Person'
import { UseAppContext } from './ApplicationContext'
import RequirementUI from './Requirement'
import AddRequirementForm from './AddRequirementForm'

const Person = ({ person }: { person: IPerson }) => {
    const { update, modalsDispatch, modals } = UseAppContext()

    const executed = person.getExecutedReauirements()
    const actual = person.getActualRequirements()

    return (
        <div className="pdg bdr">
            <h2>{person.getName()} , Person</h2>

            <button
                className="btn"
                onClick={() => {
                    modalsDispatch([
                        ...modals,
                        <AddRequirementForm person={person} />,
                    ])
                }}
            >
                Add Requirement
            </button>

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
                                <RequirementUI
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
                                <RequirementUI
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
