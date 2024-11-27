import React from 'react'
import { UseAppContext } from './ApplicationContext'
import { UseDateContext } from './AddRequirementContext'

const AddRequirementValueForm = () => {
    const { setTransactionValue, transactionValue } = UseDateContext()

    return (
        <div className="bdr pdg">
            <input
                type="number"
                value={transactionValue}
                onChange={(e) => {
                    setTransactionValue(
                        Number.parseFloat(e.currentTarget.value)
                    )
                }}
            />
        </div>
    )
}

export default AddRequirementValueForm
