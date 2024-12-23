import React, { useEffect, useMemo, useState } from 'react'
import { ITransactionRequirementCommand } from '../../../../core/requirement-command/RequirementCommand'
import RegularRequirementItem from './Regular-requirement-item'
import { IPerson } from '../../../../core/person/Person'

const RequirementModule = ({
    requirements,
    user,
}: {
    requirements: ITransactionRequirementCommand[]
    user: IPerson
}) => {
    const length = useMemo(() => {
        return requirements.length
    }, [requirements])

    const [fullReqSize, setFullReqSize] = useState(length > 3)

    useEffect(() => {}, [length])

    return (
        <div className="flex-box flex-dir-col">
            {requirements.map((requirement, i) => {
                const execDate = requirement.getExecutionTimestamp()

                return fullReqSize ? (
                    <RegularRequirementItem
                        requirement={requirement}
                        user={user}
                    />
                ) : (
                    <MinimalisticRequirement
                        requirement={requirement}
                        user={user}
                    />
                )
            })}
        </div>
    )
}

export default RequirementModule

const MinimalisticRequirement = ({
    requirement,
    user,
}: {
    requirement: ITransactionRequirementCommand
    user: IPerson
}) => {
    return (
        <div
            onClick={() => {
                // setCurentWindow(
                //     <RequirementUI
                //         requirement={requirement}
                //         person={person}
                //         key={i}
                //     />
                // )
            }}
            className={
                'bdr pdg btn  hover--parent flex-box flex-dir-col' +
                (requirement.checkIfExecuted() ? ' requirement--executed' : '')
            }
        >
            <div className="flex-box flex-dir-col flex-center">
                <div> == {requirement.getTitle()} == </div>
                {/* <div>
                                                = {requirement.getDescription()}{' '}
                                                =
                                            </div> */}
                <div className="flex-box">
                    <div className="value-color--txt flex-item">
                        {[' - ', ' + '][requirement.getTransactionTypeCode()]}
                    </div>
                    <div className="flex-item">:</div>
                    <div className="value-color--txt flex-item">
                        {requirement.getValue()}
                    </div>
                </div>
                <div className="flex-box">
                    {new Date(
                        requirement.getExecutionTimestamp()
                    ).getFullYear()}
                    .{new Date(requirement.getExecutionTimestamp()).getMonth()}.
                    {new Date(requirement.getExecutionTimestamp()).getDate()}/
                    {new Date(requirement.getExecutionTimestamp()).getHours()}:
                    {new Date(requirement.getExecutionTimestamp()).getMinutes()}
                    <div style={{ fontWeight: 'bolder' }}>
                        {Date.now() > requirement.getExecutionTimestamp() ? (
                            <span style={{ color: 'black' }}>'EXPIRED'</span>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
            {!requirement.checkIfExecuted() ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        requirement.execute(user)
                    }}
                    className="hover--child btn"
                >
                    execute
                </button>
            ) : null}
        </div>
    )
}
