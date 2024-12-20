import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'

import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const ApplyButtonUI = () => {
    const { loginedPerson: currentPerson, app } = UseAppContext()

    const {
        description,
        title,
        value,
        dateObj: dateToExecute,
        direction: cashFlowDirectionCode,
    } = UseDateFormContext()

    return (
        <div className="flex-box">
            <button
                className="btn"
                onClick={() => {
                    app.addRequirement({
                        cashFlowDirectionCode:
                            cashFlowDirectionCode === 'increment' ? 0 : 1,
                        dateToExecute,
                        description,
                        isExecuted: false,
                        title,
                        value,
                    })
                }}
            >
                Apply
            </button>
        </div>
    )
}

export default ApplyButtonUI
