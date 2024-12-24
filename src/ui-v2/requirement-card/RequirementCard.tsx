import React from 'react'
import { ITransactionRequirementCommand } from '../../core/requirement-command/RequirementCommand'
import { UseAppContext } from '../context/UseAppContext'
import { IRequirementStats } from '../../core/requirement-command/interfaces'

const RequirementCard = ({
    requirement,
}: {
    requirement: Omit<IRequirementStats , 'userId'>
}) => {
    const { app } = UseAppContext()

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
                    <button className="btn">do smth</button>
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

export default RequirementCard
