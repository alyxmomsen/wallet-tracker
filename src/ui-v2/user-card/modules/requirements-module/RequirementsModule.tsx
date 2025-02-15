import React, { useEffect, useMemo, useState } from 'react'
import RegularRequirementItem from './Regular-requirement-item'

import { UseAppContext } from '../../../context/UseAppContext'
import {
    IRequirementStats,
    IRrequirementsStatsType,
} from 'cash-flow/dist/core/requirement-command/interfaces'
import { IUserStats } from 'cash-flow/dist/core/types/common'

const RequirementModule = ({
    requirements,
    user,
}: {
    requirements: Omit<IRrequirementsStatsType, 'userId' | 'deleted'>[]
    user: Omit<IUserStats, 'id' | 'password' | 'requirements'> & {
        requirements: Omit<IRrequirementsStatsType, 'deleted' | 'userId'>[]
    }
}) => {
    const length = useMemo(() => {
        return requirements.length
    }, [requirements])

    const [fullReqSize, setFullReqSize] = useState(length > 3)

    const [listMode, setListMode] = useState(false)

    useEffect(() => {}, [length])

    return (
        <div className="flex-box flex-dir-col">
            <div>
                <button
                    onClick={() => {
                        setListMode((curr) => !curr)
                    }}
                >
                    list mode is:{' '}
                    {listMode ? <span>ON</span> : <span>OFF</span>}
                </button>
            </div>
            {requirements.map((requirement, i) => {
                const execDate = requirement.dateToExecute

                return (
                    <RegularRequirementItem
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
    requirement: Omit<IRequirementStats, 'userId'>
    user: Omit<IUserStats, 'id'>
}) => {
    const { app } = UseAppContext()

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
                (requirement.executed ? ' requirement--executed' : '')
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
                    {new Date(requirement.dateToExecute).getFullYear()}.
                    {new Date(requirement.dateToExecute).getMonth()}.
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
            {!requirement.executed ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation()

                        
                        app.executeTransactsionById(requirement.id, () => {
                            alert('jo people')
                        } , null)
                    }}
                    className="hover--child btn"
                >
                    execute
                </button>
            ) : null}
        </div>
    )
}
