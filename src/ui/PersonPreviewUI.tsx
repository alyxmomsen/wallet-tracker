import React from 'react'
import { IPerson } from '../core/Person'
import { UseAppCtx } from './AppCtxProvider'
import RequirementPreviewUI from './RequirementPrevUI'
import AddReqForm from './add-requirements-form/AddReqForm'
import PersonCdUi from './PrsnCrdUI'
import { UseAppContext } from '../ui-v2/context/UseAppContext'

const PersonPreviewUI = ({ person }: { person: IPerson }) => {
    // const { update, setModals, modals } = UseAppCtx()

    const appContext = UseAppContext()

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
                                // setModals([
                                //     ...modals,
                                //     <AddRequirementForm person={person} />,
                                // ])
                            }}
                        >
                            Add Requirement
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                // setModals([
                                //     ...modals,
                                //     <PersonCardUI person={person} />,
                                // ])
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
