import React from 'react'
import { ITransactionRequirementCommand } from '../../../../core/requirement-command/RequirementCommand'
import { UseAppContext } from '../../../context/UseAppContext'
import RequirementCard from '../../../requirement-card/RequirementCard'
import { IPerson } from '../../../../core/person/Person'
import { IRequirementStats } from '../../../../core/requirement-command/interfaces'
import { IUserData } from '../../../../core/types/common'

const RegularRequirementItem = ({
    requirement,
    user,
}: {
    requirement: Omit<IRequirementStats, 'userId'>
    user: Omit<IUserData, 'id'>
}) => {
    const { app, curentWindow, setCurentWindow } = UseAppContext()

    return (
        <div
            onClick={() => {
                setCurentWindow(<RequirementCard requirement={requirement} />)
            }}
            className={
                'bdr pdg btn  hover--parent flex-box flex-dir-col' +
                (requirement.isExecuted ? ' requirement--executed' : '')
            }
        >
            <div className="flex-box  flex-center">
                <div> == {requirement.title} == </div>
                {/* <div>
                                                = {requirement.getDescription()}{' '}
                                                =
                                            </div> */}
                <div className="flex-box">
                    <div className="value-color--txt flex-item">
                        {[' - ', ' + '][requirement.cashFlowDirectionCode]}
                    </div>
                    {/* <div className="flex-item">:</div> */}
                    <div className="value-color--txt flex-item">
                        {requirement.value}
                    </div>
                </div>
                <div className="flex-box">
                    mother fucker
                    {new Date(requirement.dateToExecute).getFullYear()}
                    {new Date(requirement.dateToExecute).getMonth()}
                    {new Date(requirement.dateToExecute).getDate()}
                </div>
            </div>
            {!requirement.isExecuted ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        app.executeTransactsionById(requirement.id)
                    }}
                    className="hover--child btn"
                >
                    execute
                </button>
            ) : null}
        </div>
    )
}

export default RegularRequirementItem
