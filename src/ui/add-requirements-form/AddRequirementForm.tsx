import React from 'react'
import { UseAppContext } from '../ApplicationContext'
import { IPerson } from '../../core/Person'

import { UseDateContext } from './AddRequirementContext'
import PersonCardUI from '../PersonCardUI'
import RequirementsUI from '../RequirementsUI'
import AddDateForm from './AddDateForm'
import AddTimeForm from './AddTimeForm'
import AddTransactionTypeForm from './AddTransactionTypeForm'
import AddRequirementButton from './AddRequirementButton'
import AddRequirementValueForm from './AddRequirementValueForm'

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

    const { date, month, year, hours, minutes } = UseDateContext()
    const executedRequirements = person.getExecutedRequirements()
    const actualRequirements = person.getActualRequirements()
    return (
        <div className="flex-box flex-dir-col">
            <h2 className="bdr pdg">AddRequirementForm</h2>
            <header className="bdr pdg flex-box">
                <div
                    className="bdr pdg btn"
                    onClick={() => {
                        setModals([...modals, <PersonCardUI person={person} />])
                    }}
                >
                    {person.getName()}
                </div>
                <div className="bdr pdg">
                    wallet balance: {person.getWalletBalance()}
                </div>
                <div className="bdr pdg flex-box">
                    actual:{actualRequirements.length} executed:
                    {executedRequirements.length}
                    <button
                        className="btn"
                        onClick={() => {
                            setModals([
                                ...modals,
                                <RequirementsUI person={person} />,
                            ])
                        }}
                    >
                        requirements
                    </button>
                </div>
                <div className="bdr pdg">
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
            </header>
            <div className="flex-box">
                <div className="pdg bdr">
                    <h4>date-time area</h4>
                    <div className="pdg flex-box">
                        <div className=" bdr pdg flex-box flex-dir-col">
                            {`${date}-${month}-${year}`}
                            <div>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setModals([...modals, <AddDateForm />])
                                    }}
                                >
                                    set date
                                </button>
                            </div>
                        </div>
                        <div className="bdr pdg flex-box flex-dir-col">
                            {`${hours}:${minutes}`}
                            <div>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setModals([...modals, <AddTimeForm />])
                                    }}
                                >
                                    set time
                                </button>
                            </div>
                        </div>
                    </div>
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
        </div>
    )
}

export default AddRequirementForm
