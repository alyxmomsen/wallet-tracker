import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'

import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const ApplyButtonUI = () => {
    const { app } = UseAppContext()

    const {
        description,
        title,
        value,
        dateObj: dateToExecute,
        direction: cashFlowDirectionCode,
        loading,
        loaded,
        setLoading,
        setLoaded,
    } = UseDateFormContext()

    return (
        <div className="flex-box">
            <button
                className="btn"
                onClick={async () => {
                    setLoading(true)
                    setLoaded(false)
                    const response = await app.addRequirement({
                        cashFlowDirectionCode:
                            cashFlowDirectionCode === 'increment' ? 0 : 1,
                        dateToExecute,
                        description,
                        isExecuted: false,
                        title,
                        value,
                    })

                    setLoading(false)
                    setLoaded(true)
                }}
            >
                Apply
            </button>
        </div>
    )
}

export default ApplyButtonUI
