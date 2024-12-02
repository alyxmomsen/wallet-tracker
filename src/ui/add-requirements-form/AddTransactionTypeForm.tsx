import React from 'react'
import { UseDateContext } from './AddRequirementContext'

const AddTransactionTypeForm = () => {
    const {
        setHours,
        hours,
        setMinutes,
        minutes,
        month,
        date: day,
        year,
        transactionType,
        setTransactionType,
    } = UseDateContext()

    return (
        <div className="bdr pdg">
            <h5>type transaction option: </h5>
            <label
                className={`btn pdg dsp-inl-bl ${transactionType === 'inc' ? ' checked' : ''}`}
                htmlFor="inc-radio-button"
            >
                increment
            </label>{' '}
            |
            <label
                className={`btn pdg dsp-inl-bl ${transactionType === 'dec' ? ' checked' : ''}`}
                htmlFor="dec-radio-button"
            >
                decrement
            </label>
            <input
                hidden
                id="inc-radio-button"
                onChange={() => {
                    setTransactionType('inc')
                }}
                type="radio"
                value={'inc'}
                name="transactiontype"
                checked={transactionType === 'inc'}
            />
            <input
                hidden
                id="dec-radio-button"
                onChange={() => {
                    setTransactionType('dec')
                }}
                type="radio"
                value={'dec'}
                name="transactiontype"
                checked={transactionType === 'dec'}
            />
        </div>
    )
}

export default AddTransactionTypeForm
