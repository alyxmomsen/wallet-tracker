import React from 'react'
import { IPerson } from '../core/Person'
import { UseAppContext } from './ApplicationContext'
import RequirementUI from './Requirement'
import AddRequirementForm from './AddRequirementForm'

const PersonPreviewUI = ({ person }: { person: IPerson }) => {
    const { update, modalsDispatch, modals } = UseAppContext()

    const executed = person.getExecutedRequirements()
    const actual = person.getActualRequirements()

    return (
        <div className="pdg bdr flex-item">
            <h2>{person.getName()} , Person</h2>
            <div className="bdr pdg flex-box">
                <h3>controls</h3>
                <div>
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
                </div>
                <div>
                    <button>Open The Card</button>
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
