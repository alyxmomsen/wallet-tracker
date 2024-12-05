import React from 'react'
import { IRequirementCommand } from '../../core/RequirementCommand'
import { IPerson } from '../../core/person/Person'
import { UseAppContext } from '../context/UseAppContext'

const RequirementUI = ({
    requirement,
    person,
}: {
    requirement: IRequirementCommand
    person: IPerson
}) => {
    const { update } = UseAppContext()

    return (
        <div>
            <h1>RequirementUI</h1>
            <div>
                <div>{requirement.getDescription()}</div>
                <div>{requirement.getValue()}</div>
                <div>
                    {(() => {
                        const date = requirement.getExecutionDate()

                        return (
                            <div>
                                {date.getDate()}-{date.getMonth() + 1}-
                                {date.getFullYear()}
                            </div>
                        )
                    })()}
                </div>
                <div>
                    <button
                        disabled={requirement.checkIfExecuted()}
                        onClick={() => {
                            requirement.execute(person)
                            update()
                        }}
                        className={requirement.checkIfExecuted() ? '' : 'btn'}
                    >
                        {!requirement.checkIfExecuted()
                            ? 'Execute'
                            : 'executed!'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RequirementUI
