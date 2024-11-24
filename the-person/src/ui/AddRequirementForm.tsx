import React, { createContext, useContext, useEffect, useState } from 'react'
import { UseAppContext } from './ApplicationContext'
import SomeComponent from './SomeComponent'
import { IPerson } from '../core/Person'
import { Requirement } from '../core/Requirement'
import {
    DecrementMoneyRequirementCommand,
    IncrementValueRequirementCommand,
} from '../core/RequirementCommand'
import RequirementPreviewUI from './Requirement'
import AddDateForm from './AddDateForm'
import AddTimeForm from './AddTimeForm'
import AddRequirementButton from './AddRequirementButton'
import AddTransactionTypeForm from './AddTransactionTypeForm'

export type TTransactionType = 'inc' | 'dec'

export type DateContextValue = {
    date: number
    month: number
    year: number
    hours: number
    minutes: number
    transactionType: 'inc' | 'dec'
    transactionValue: number
    setDate: (value: number) => void
    setMonth: (value: number) => void
    setYear: (value: number) => void
    setHours: (value: number) => void
    setMinutes: (value: number) => void
    setTransactionType: (value: TTransactionType) => void
    setTransactionValue: (value: number) => void
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

    const [transactionValue, setTransactionValue] = useState<number>(1000)
    const [transactionType, setTransactionType] =
        useState<TTransactionType>('inc')

    return (
        <DateContext.Provider
            value={{
                date: day,
                month,
                year,
                minutes,
                hours,
                transactionType,
                transactionValue,
                setDate: (value: number) => setDay(value),
                setMonth: (value: number) => setMonth(value),
                setYear: (value: number) => setYear(value),
                setHours: (value: number) => setHours(value),
                setMinutes: (value: number) => setMinutes(value),
                setTransactionType: (value: TTransactionType) =>
                    setTransactionType(value),
                setTransactionValue: (value: number) =>
                    setTransactionValue(value),
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

    // const [day, setDay] = useState(new Date().getDate())
    // const [month, setMonth] = useState(new Date().getMonth() + 1)
    // const [year, setYear] = useState(new Date().getFullYear())

    // const [minutes, setMinutes] = useState(new Date().getMinutes())
    // const [hours, setHours] = useState(
    //     (() => {
    //         return new Date().getHours()
    //     })()
    // )

    const [transactionValue, setTransactionValue] = useState(1000)

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
                        <AddDateForm />
                        <AddTimeForm />
                        <AddTransactionTypeForm />
                        <AddRequirementButton person={person} />
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
                                                <RequirementPreviewUI
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
                                                <RequirementPreviewUI
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
