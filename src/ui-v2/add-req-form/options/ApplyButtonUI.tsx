import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'

import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const ApplyButtonUI = () => {
    const { app } = UseAppContext()

    const {
        description,
        title,
        value,
        dateToExecute,
        transactionTypeCode,
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
                    app.addRequirement({
                        transactionTypeCode,
                        dateToExecute,
                        description,
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
