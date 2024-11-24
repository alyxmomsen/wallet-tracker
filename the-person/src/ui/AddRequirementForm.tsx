import React, { createContext, useContext, useEffect, useState } from 'react'
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

export type DateContextValue = {
    date: number
    month: number
    year: number
    hours: number
    minutes: number
    setDate: (value: number) => void
    setMonth: (value: number) => void
    setYear: (value: number) => void
    setHours: (value: number) => void
    setMinutes: (value: number) => void
    // setDate: () => void;
}

const DateContext = createContext<DateContextValue | undefined>(undefined)

const DateContextProvider = ({ children }: { children: JSX.Element }) => {
    const [day, setDay] = useState(new Date().getDate())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())

    const [minutes, setMinutes] = useState(new Date().getMinutes())
    const [hours, setHours] = useState(
        (() => {
            return new Date().getHours()
        })()
    )

    return (
        <DateContext.Provider
            value={{
                date: day,
                month,
                year,
                minutes,
                hours,
                setDate: (value: number) => setDay(value),
                setMonth: (value: number) => setMonth(value),
                setYear: (value: number) => setYear(value),
                setHours: (value: number) => setHours(value),
                setMinutes: (value: number) => setMinutes(value),
                // setMonth:(value: number) => setDay(value),
            }}
        >
            {children}
        </DateContext.Provider>
    )
}

export const UseDateContext = (): DateContextValue => {
    const ctx = useContext(DateContext)

    if (ctx === undefined) {
        throw new Error('oh, fuck')
    }

    return ctx
}

const AddRequirementForm = ({ person }: { person: IPerson }) => {
    const { service, modals, modalsDispatch, update, currentPerson } =
        UseAppContext()

    const {setHours , hours , setMinutes , minutes , month , date:day , year} = UseDateContext();
    
    // const [day, setDay] = useState(new Date().getDate())
    // const [month, setMonth] = useState(new Date().getMonth() + 1)
    // const [year, setYear] = useState(new Date().getFullYear())

    // const [minutes, setMinutes] = useState(new Date().getMinutes())
    // const [hours, setHours] = useState(
    //     (() => {
    //         return new Date().getHours()
    //     })()
    // )

    const [transactionValue, setTransactionValue] = useState<number>(1000)
    const [transactionType, setTransactionType] =
        useState<TransactionType>('inc')

    const executedRequirements = person.getExecutedRequirements()
    const actualRequirements = person.getActualRequirements()

    return (
        <DateContextProvider>
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

                        <div className="pdg bdr">
                            <h5>TiME</h5>
                            <div className="scale pdg bdr">
                                <h6>{'hours:'}</h6>
                                <div>
                                    <input
                                        onChange={(e) => {
                                            const value = Number.parseInt(
                                                e.currentTarget.value
                                            )
                                            
                                            setHours(
                                                value > 23
                                                    ? 0
                                                    : value < 0
                                                      ? 23
                                                      : value
                                            )
                                        }}
                                        placeholder="hours"
                                        type="number"
                                        value={hours}
                                    />
                                </div>
                            </div>
                            <div className="scale pdg bdr">
                                <h6>minutes</h6>
                                <div>
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
                    </div>
                    <div className="bdr pdg">
                        <h4>{'Value'}</h4>
                        <div>
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
                    {actualRequirements.length ||
                    executedRequirements.length ? (
                        <div>
                            <h2>Requirements:</h2>
                            {actualRequirements.length ? (
                                <div>
                                    <h3>Actual:</h3>
                                    {person
                                        .getActualRequirements()
                                        .map((requirement) => {
                                            return (
                                                <RequirementUI
                                                    person={person}
                                                    requirement={requirement}
                                                />
                                            )
                                        })}
                                </div>
                            ) : null}
                            {executedRequirements.length ? (
                                <div className="bdr pdg">
                                    <h3>Executed:</h3>
                                    {person
                                        .getExecutedRequirements()
                                        .map((requirement) => {
                                            return (
                                                <RequirementUI
                                                    person={person}
                                                    requirement={requirement}
                                                />
                                            )
                                        })}
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
        </DateContextProvider>
    )
}

export default AddRequirementForm
