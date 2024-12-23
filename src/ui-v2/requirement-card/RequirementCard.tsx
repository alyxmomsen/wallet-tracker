import React from 'react'
import { ITransactionRequirementCommand } from '../../core/requirement-command/RequirementCommand'
import { UseAppContext } from '../context/UseAppContext'

const RequirementCard = ({
    requirement,
}: {
    requirement: ITransactionRequirementCommand
}) => {
    const { app } = UseAppContext()

    return (
        <div>
            <h2>Requirement</h2>
            <h3>title: {requirement.getTitle()}</h3>
            <p>
                <b>description:</b> {requirement.getDescription()}
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
                            app.deleteRequirement(requirement.getId())
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
