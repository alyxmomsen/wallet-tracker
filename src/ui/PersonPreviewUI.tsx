import React from 'react'
import { IPerson } from '../core/Person'
import { UseAppContext } from './ApplicationContext'
import RequirementPreviewUI from './RequirementPrevUI'
import AddRequirementForm from './add-requirements-form/AddRequirementForm'
import PersonCardUI from './PersonCardUI'

const PersonPreviewUI = ({ person }: { person: IPerson }) => {
    const { update, setModals, modals } = UseAppContext()

    const executed = person.getExecutedRequirements()
    const actual = person.getActualRequirements()

    return (
        <div className="pdg bdr flex-item">
            <h2>{person.getName()} , Person</h2>
            <div className="bdr pdg">
                <h3>controls</h3>
                <div className=" flex-box gap">
                    <div>
                        <button
                            className="btn"
                            onClick={() => {
                                setModals([
                                    ...modals,
                                    <AddRequirementForm person={person} />,
                                ])
                            }}
                        >
                            Add Requirement
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setModals([
                                    ...modals,
                                    <PersonCardUI person={person} />,
                                ])
                            }}
                            className="btn"
                        >
                            Open The Card
                        </button>
                    </div>
                </div>
            </div>
            <div className="bdr pdg">
                wallet:
                {person.getWalletBalance()}
            </div>
        </div>
    )
}

export default PersonPreviewUI
