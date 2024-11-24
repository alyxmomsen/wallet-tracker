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
            <div className='bdr pdg'>
                {requirement.getFormatedStringDate()}
            </div>
            {requirement.checkIfActual() ? (
                <div className='bdr pdg'>
                    <h3>controls</h3>
                    <div className='flex-box'>
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
                        <div>
                            <button className="btn" onClick={() => {}}>
                                delete
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className='bdr pdg'>{requirement.getBehaviorDescription()}</div>
        </div>
    )
}

export default RequirementPreviewUI
