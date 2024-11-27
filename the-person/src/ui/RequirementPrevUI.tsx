import React from 'react'
import { IRequirement } from '../core/Requirement'
import { IPerson } from '../core/Person'
import { UseAppContext } from './ApplicationContext'

const RequirementPreviewUI = ({
    requirement,
    person,
}: {
    requirement: IRequirement
    person: IPerson
}) => {
    const { update } = UseAppContext()

    return (
        <div className="pdg bdr">
            <div className="bdr pdg flex-box">
                {requirement.getFormatedStringDate()}
                {requirement.checkIfActual() ? (
                    <div>
                        <button
                            className="btn"
                            onClick={() => {
                                requirement.satisfy(person)
                                update()
                            }}
                        >
                            exec
                        </button>
                    </div>
                ) : null}
                <div>
                    <button className="btn" onClick={() => {}}>
                        delete
                    </button>
                </div>
                <div className="">{requirement.getBehaviorDescription()}</div>
            </div>
        </div>
    )
}

export default RequirementPreviewUI
