import React, { useState } from 'react'
import { UseAppCtx } from '../AppCtxProvider'
import { UseDateContext } from './AddRequirementContext'

const AddRequirementValueForm = () => {
    const { setTransactionValue, transactionValue } = UseDateContext()
    const stepValues = [1, 3, 5, 10, 50, 100, 1000]
    const [stepValue, setStepValue] = useState(stepValues[0])
    return (
        <div className="bdr pdg">
            <div className="flex-box">
                <div className="flex-box">
                    {stepValues.map((elem) => {
                        return (
                            <div
                                className={`${stepValue === elem ? 'checked' : ''} pdg`}
                            >
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setStepValue(elem)
                                    }}
                                >
                                    {elem}
                                </button>
                            </div>
                        )
                    })}
                </div>
                <div className="pdg">
                    <button
                        className="btn"
                        onClick={() => {
                            setTransactionValue(transactionValue + stepValue)
                        }}
                    >
                        +
                    </button>
                </div>
                <div className="pdg">
                    <button
                        className="btn"
                        onClick={() => {
                            setTransactionValue(transactionValue - stepValue)
                        }}
                    >
                        -
                    </button>
                </div>
            </div>
            <div className="bdr pdg">
                <input
                    type="number"
                    step={50}
                    value={transactionValue}
                    onChange={(e) => {
                        // setCurrentValue(
                        //     Number.parseFloat(e.currentTarget.value)
                        // )
                        setTransactionValue(
                            Number.parseFloat(e.currentTarget.value)
                        )
                    }}
                />
            </div>
        </div>
    )
}

export default AddRequirementValueForm
