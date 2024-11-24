import React, { useState } from 'react'
import { UseAppContext } from './ApplicationContext'
import SomeComponent from './SomeComponent'
import { IPerson } from '../core/Person'
import { Requirement } from '../core/Requirement'
import {
    DecrementMoneyRequirementCommand,
    IncrementValueRequirementCommand,
} from '../core/RequirementCommand'

export type TransactionType = 'inc' | 'dec'

const AddRequirementForm = () => {
    const { service, modals, modalsDispatch, update, currentPerson } =
        UseAppContext()

    const [minutes, setMinutes] = useState(new Date().getMinutes())
    const [hours, setHours] = useState(new Date().getHours())

    const [day, setDay] = useState(new Date().getDate())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())

    const [transactionValue, setTransactionValue] = useState<number>(0)
    const [transactionType, setTransactionType] =
        useState<TransactionType>('dec')

    return (
        <div>
            <h2>AddRequirementForm</h2>
            <h3>
                {currentPerson
                    ? currentPerson.getName()
                    : 'person is not choisen'}
            </h3>
            <div>
                <button
                    className="btn"
                    onClick={() => {
                        console.log({ modals })

                        modals.forEach((elem) => {
                            console.log({ elem })
                        })

                        modalsDispatch([
                            ...modals.filter((elem) => modals.pop() !== elem),
                        ])
                    }}
                >
                    close
                </button>

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
                <input placeholder="hours" type="number" value={hours} />
                <input
                    placeholder="minutes"
                    type="number"
                    value={minutes}
                    onChange={() => {}}
                />
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
                <input
                    onChange={() => {
                        setTransactionType('inc')
                    }}
                    type="radio"
                    value={'inc'}
                    name="transactiontype"
                />
                <input
                    onChange={() => {
                        setTransactionType('dec')
                    }}
                    type="radio"
                    value={'dec'}
                    name="transactiontype"
                />

                <button
                    className="btn pdg"
                    onClick={() => {
                        if (currentPerson === null) {
                            return null
                        }

                        currentPerson.addRequirement(
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
    )
}

export default AddRequirementForm
