import React, { createContext, useContext, useEffect, useState } from 'react'
import { UseAppContext } from './ApplicationContext'
import { IPerson } from '../core/Person'
import RequirementPreviewUI from './Requirement'
import AddDateForm from './AddDateForm'
import AddTimeForm from './AddTimeForm'
import AddRequirementButton from './AddRequirementButton'
import AddTransactionTypeForm from './AddTransactionTypeForm'
import AddRequirementValueForm from './AddRequirementValueForm'
import {
    AddRequirementContextPorvider,
    DateContext,
} from './AddRequirementContext'

export type TTransactionType = 'inc' | 'dec'

export type DateContextValue = {
    date: number
    month: number
    year: number
    hours: number
    minutes: number
    transactionType: TTransactionType
    transactionValue: number
    setDate: (value: number) => void
    setMonth: (value: number) => void
    setYear: (value: number) => void
    setHours: (value: number) => void
    setMinutes: (value: number) => void
    setTransactionType: (value: TTransactionType) => void
    setTransactionValue: (value: number) => void
}

const AddRequirementForm = ({ person }: { person: IPerson }) => {
    const {
        service,
        modals,
        setModals: setModals,
        update,
        currentPerson,
    } = UseAppContext()
    const executedRequirements = person.getExecutedRequirements()
    const actualRequirements = person.getActualRequirements()
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
                            modals.forEach((elem) => {
                                console.log({ elem })
                            })
                            setModals([
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
                    <button
                        onClick={() => {
                            setModals([...modals, <AddDateForm />])
                        }}
                    >
                        set date
                    </button>
                    <button onClick={() => {}}>set time</button>
                    {}
                    <AddDateForm />
                    <AddTimeForm />
                </div>
                <div>
                    <AddTransactionTypeForm />
                </div>
                <div>
                    <AddRequirementButton person={person} />
                </div>
                <div>
                    <AddRequirementValueForm />
                </div>
            </div>
            <div className="pdg bdr">
                {actualRequirements.length || executedRequirements.length ? (
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
    )
}

export default AddRequirementForm
