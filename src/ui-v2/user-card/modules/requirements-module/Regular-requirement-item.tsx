import React from 'react'
import { ITransactionRequirementCommand } from '../../../../core/requirement-command/RequirementCommand'
import { UseAppContext } from '../../../context/UseAppContext'
import RequirementCard from '../../../requirement-card/RequirementCard'
import { IPerson } from '../../../../core/person/Person'

const RegularRequirementItem = ({
    requirement,
    user,
}: {
    requirement: ITransactionRequirementCommand
    user: IPerson
}) => {
    const { curentWindow, setCurentWindow } = UseAppContext()

    return (
        <div
            onClick={() => {
                setCurentWindow(<RequirementCard requirement={requirement} />)
            }}
            className={
                'bdr pdg btn  hover--parent flex-box flex-dir-col' +
                (requirement.checkIfExecuted() ? ' requirement--executed' : '')
            }
        >
            <div className="flex-box  flex-center">
                <div> == {requirement.getTitle()} == </div>
                {/* <div>
                                                = {requirement.getDescription()}{' '}
                                                =
                                            </div> */}
                <div className="flex-box">
                    <div className="value-color--txt flex-item">
                        {[' - ', ' + '][requirement.getTransactionTypeCode()]}
                    </div>
                    {/* <div className="flex-item">:</div> */}
                    <div className="value-color--txt flex-item">
                        {requirement.getValue()}
                    </div>
                </div>
                <div className="flex-box">
                    mother fucker
                    {new Date(
                        requirement.getExecutionTimestamp()
                    ).getFullYear()}
                    {new Date(requirement.getExecutionTimestamp()).getMonth()}
                    {new Date(requirement.getExecutionTimestamp()).getDate()}
                </div>
            </div>
            {!requirement.checkIfExecuted() ? (
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

export default RegularRequirementItem
