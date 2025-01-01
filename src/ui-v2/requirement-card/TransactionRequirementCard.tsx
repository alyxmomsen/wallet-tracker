import React from 'react'
import { UseAppContext } from '../context/UseAppContext'
import {
    IRequirementStats,
    IRrequirementsStatsType,
} from '../../core/requirement-command/interfaces'
import PersonCardUI from '../user-card/PersonCardUI'

const TransactionRequirementCard = ({
    requirement,
}: {
    requirement: Omit<IRrequirementsStatsType, 'userId' | 'deleted'>
}) => {
    const { app, setCurentWindow } = UseAppContext()

    return (
        <div>
            <h2>Requirement</h2>
            <h3>title: {requirement.title}</h3>
            <p>
                <b>description:</b> {requirement.description}
            </p>
            <div className="flex-box">
                <div>
                    <button className="btn">execute</button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            const userStats = app.getUserStats()
                            if (userStats) {
                                setCurentWindow(
                                    <PersonCardUI person={userStats} />
                                )
                            }
                        }}
                        className="btn"
                    >
                        go to User
                    </button>
                </div>
                <div>
                    <button className="btn">edit</button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            app.deleteRequirement(requirement.id)
                        }}
                        className="btn"
                    >
                        delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransactionRequirementCard
