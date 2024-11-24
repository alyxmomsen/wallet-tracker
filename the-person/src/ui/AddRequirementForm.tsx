import React, { useState } from 'react'
import { UseAppContext } from './ApplicationContext'
import SomeComponent from './SomeComponent'
import { IPerson } from '../core/Person'
import { Requirement } from '../core/Requirement'
import {
    DecrementMoneyRequirementCommand,
    IncrementValueRequirementCommand,
} from '../core/RequirementCommand'
import RequirementUI from './Requirement'

export type TransactionType = 'inc' | 'dec'

const AddRequirementForm = ({ person }: { person: IPerson }) => {
    const { service, modals, modalsDispatch, update, currentPerson } =
        UseAppContext()

    const [minutes, setMinutes] = useState(new Date().getMinutes())
    const [hours, setHours] = useState(new Date().getHours())

    const [day, setDay] = useState(new Date().getDate())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())

    const [transactionValue, setTransactionValue] = useState<number>(1000)
    const [transactionType, setTransactionType] =
        useState<TransactionType>('inc')

    return (
        <div>
            <h2>AddRequirementForm</h2>
            <h3>{person.getName()}</h3>
            <div>wallet balance: {person.getWalletBalance()}</div>
            <div className="flex-box">
                <div className="bdr pdg">
                    <h5>close button control area</h5>
                    <button
                        className="btn"
                        onClick={() => {
                            console.log({ modals })

                            modals.forEach((elem) => {
                                console.log({ elem })
                            })

                            modalsDispatch([
                                ...modals.filter(
                                    (elem) => modals.pop() !== elem
                                ),
                            ])
                        }}
                    >
                        close
                    </button>
                </div>
                <div className="pdg bdr">
                    <h4>date-time area</h4>
                    <div className="pdg bdr scale">
                        <h5>DATE</h5>
                        <button
                            onClick={() => {
                                const date = new Date()
                                setDay(date.getDate())
                                setMonth(date.getMonth() + 1)
                                setYear(date.getFullYear())
                            }}
                            className="btn"
                        >
                            reset
                        </button>
                        <div className="pdg bdr">
                            <input
                                onChange={(e) => {
                                    console.log(e.currentTarget.value)
                                    const date = e.currentTarget.value
                                    const [year, month, day] = date.split('-')
                                    console.log({ year, month, day })
                                    setDay(Number.parseInt(day))
                                    setMonth(Number.parseInt(month))
                                    setYear(Number.parseInt(year))
                                }}
                                type="date"
                                value={`${year}-${month}-${day}`}
                            />
                        </div>
                    </div>
                    <div className="pdg bdr">
                        <h5>TiME</h5>
                        <div className="scale pdg bdr">
                            <h6>hours:</h6>
                            <input
                                onChange={(e) => {
                                    const value = Number.parseInt(
                                        e.currentTarget.value
                                    )

                                    setHours(
                                        value > 23 ? 0 : value < 0 ? 23 : value
                                    )
                                }}
                                placeholder="hours"
                                type="number"
                                value={hours}
                            />
                        </div>
                        <div className="scale pdg bdr">
                            <h6>minutes</h6>
                            <input
                                onChange={(e) => {
                                    const value = Number.parseInt(
                                        e.currentTarget.value
                                    )

                                    setMinutes(
                                        value > 59
                                            ? (() => 0)()
                                            : value < 0
                                              ? 59
                                              : value
                                    )
                                }}
                                placeholder="minutes"
                                type="number"
                                value={minutes}
                            />
                        </div>
                    </div>
                </div>
                <div className="bdr pdg">
                    <h4>value</h4>
                    <input
                        type="number"
                        step={100}
                        placeholder="value"
                        value={transactionValue}
                        onChange={(e) => {
                            setTransactionValue(
                                Number.parseFloat(e.currentTarget.value)
                            )
                        }}
                    />
                </div>

                <div className="bdr pdg">
                    <h5>type transaction option: </h5>
                    <label
                        className={`btn pdg ${transactionType === 'inc' ? ' checked' : ''}`}
                        htmlFor="inc-radio-button"
                    >
                        increment
                    </label>{' '}
                    |
                    <label
                        className={`btn pdg ${transactionType === 'dec' ? ' checked' : ''}`}
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
                <div className="pdg bdr">
                    <button
                        className="btn pdg"
                        onClick={() => {
                            person.addRequirement(
                                new Requirement(
                                    'some requirement',
                                    transactionType === 'dec'
                                        ? new DecrementMoneyRequirementCommand(
                                              transactionValue
                                          )
                                        : new IncrementValueRequirementCommand(
                                              transactionValue
                                          ),
                                    new Date(
                                        `${month}-${day}-${year} ${hours}:${minutes}`
                                    )
                                )
                            )

                            update()
                        }}
                    >
                        add requirement
                    </button>
                </div>
            </div>
            <div className="pdg bdr">
                <h3>Requirements:</h3>
                {person.getActualRequirements().map((requirement) => {
                    return (
                        <RequirementUI
                            person={person}
                            requirement={requirement}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default AddRequirementForm
