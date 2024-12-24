import React, { useEffect, useMemo, useState } from 'react'
import { ITransactionRequirementCommand } from '../../../../core/requirement-command/RequirementCommand'
import RegularRequirementItem from './Regular-requirement-item'
import { IPerson } from '../../../../core/person/Person'
import { IRequirementStats } from '../../../../core/requirement-command/interfaces'
import { IUserData } from '../../../../core/types/common'

const RequirementModule = ({
    requirements,
    user,
}: {
    requirements: Omit<IRequirementStats , 'userId'>[]
    user: Omit<IUserData ,'id'>
}) => {
    const length = useMemo(() => {
        return requirements.length
    }, [requirements])

    const [fullReqSize, setFullReqSize] = useState(length > 3)

    useEffect(() => {}, [length])

    return (
        <div className="flex-box flex-dir-col">
            {requirements.map((requirement, i) => {
                const execDate = requirement.dateToExecute

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
    requirement: Omit<IRequirementStats , 'userId'>
    user: Omit<IUserData , 'id'>
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
                (requirement.isExecuted ? ' requirement--executed' : '')
            }
        >
            <div className="flex-box flex-dir-col flex-center">
                <div> == {requirement.title} == </div>
                {/* <div>
                                                = {requirement.getDescription()}{' '}
                                                =
                                            </div> */}
                <div className="flex-box">
                    <div className="value-color--txt flex-item">
                        {[' - ', ' + '][requirement.cashFlowDirectionCode]}
                    </div>
                    <div className="flex-item">:</div>
                    <div className="value-color--txt flex-item">
                        {requirement.value}
                    </div>
                </div>
                <div className="flex-box">
                    {new Date(
                        requirement.dateToExecute
                    ).getFullYear()}
                    .{new Date(requirement.dateToExecute).getMonth()}.
                    {new Date(requirement.dateToExecute).getDate()}/
                    {new Date(requirement.dateToExecute).getHours()}:
                    {new Date(requirement.dateToExecute).getMinutes()}
                    <div style={{ fontWeight: 'bolder' }}>
                        {Date.now() > requirement.dateToExecute ? (
                            <span style={{ color: 'black' }}>'EXPIRED'</span>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
            {!requirement.isExecuted ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className="hover--child btn"
                >
                    execute
                </button>
            ) : null}
        </div>
    )
}
