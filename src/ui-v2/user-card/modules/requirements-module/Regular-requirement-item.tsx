import React from 'react'
import { UseAppContext } from '../../../context/UseAppContext'
import TransactionRequirementCard from '../../../requirement-card/TransactionRequirementCard'
import { IRrequirementsStatsType } from 'cash-flow/dist/core/requirement-command/interfaces'
import { IUserStats } from 'cash-flow/dist/core/types/common'

const RegularRequirementItem = ({
    requirement,
    user,
}: {
    requirement: Omit<IRrequirementsStatsType, 'userId' | 'deleted'>
    user: Omit<IUserStats, 'id' | 'password' | 'requirements'> & {
        requirements: Omit<IRrequirementsStatsType, 'deleted' | 'userId'>[]
    }
}) => {
    const { app, setCurentWindow } = UseAppContext()

    return (
        <div
            onClick={() => {
                setCurentWindow(
                    <TransactionRequirementCard requirement={requirement} />
                )
            }}
            className={
                'bdr pdg btn  hover--parent flex-box flex-dir-col' +
                (requirement.executed ? ' requirement--executed' : '')
            }
        >
            <div className="flex-box  flex-center">
                {requirement.dateToExecute < Date.now() ? (
                    <div
                        className="pdg"
                        style={{ backgroundColor: 'red', color: 'whitesmoke' }}
                    >
                        EXPIRED
                    </div>
                ) : null}
                <div>
                    <span>title: </span>
                    <span style={{ color: 'whitesmoke' }}>
                        {' '}
                        == {requirement.title} =={' '}
                    </span>
                </div>
                <div>= {requirement.description} =</div>
                <div className="flex-box">
                    <div className="value-color--txt flex-item">
                        {[' - ', ' + '][requirement.transactionTypeCode]}
                    </div>
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
            {!requirement.executed ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        app.executeTransactsionById(requirement.id, () => {
                            alert('sorry')
                        })
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
