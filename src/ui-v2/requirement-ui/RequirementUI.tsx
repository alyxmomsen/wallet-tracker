import React from 'react'
import { ITransactionRequirementCommand } from '../../core/requirement-command/RequirementCommand'
import { IPerson } from '../../core/person/Person'
import { UseAppContext } from '../context/UseAppContext'
import GoPersonButton from '../shared/GoPersonButtonUI'

const RequirementUI = ({
    requirement,
    person,
}: {
    requirement: ITransactionRequirementCommand
    person: IPerson
}) => {
    const { update } = UseAppContext()

    return (
        <div>
            <h1>RequirementUI</h1>
            <GoPersonButton />
            <div>
                <div>{requirement.getDescription()}</div>
                <div>{requirement.getValue()}</div>
                <div>
                    {(() => {
                        const date = requirement.getExecutionTimestamp()

                        return <div>{date}</div>
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
