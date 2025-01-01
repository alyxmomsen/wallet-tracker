import React from 'react'
import { ITransactionRequirementCommand } from '../../core/requirement-command/RequirementCommand'
import { IPerson } from '../../core/person/Person'
import { UseAppContext } from '../context/UseAppContext'
import GoPersonButton from '../shared/GoPersonButtonUI'

const TransactionRequirementUI = ({
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
                        const date = requirement.getDateToExecute()

                        return <div>{date}</div>
                    })()}
                </div>
                <div>
                    <button
                        disabled={
                            requirement.isExecuted() === null ? true : false
                        }
                        onClick={() => {
                            requirement.execute(person)
                            update()
                        }}
                        className={requirement.isExecuted() ? '' : 'btn'}
                    >
                        {!requirement.isExecuted() ? 'Execute' : 'executed!'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransactionRequirementUI
