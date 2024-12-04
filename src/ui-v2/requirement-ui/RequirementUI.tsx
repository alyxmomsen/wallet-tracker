import React from 'react'
import { IRequirementCommand } from '../../core/RequirementCommand'
import { IPerson } from '../../core/Person'

const RequirementUI = ({
    requirement,
    person,
}: {
    requirement: IRequirementCommand
    person: IPerson
}) => {
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
                        onClick={() => {
                            requirement.execute(person)
                        }}
                        className="btn"
                    >
                        execute
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RequirementUI
