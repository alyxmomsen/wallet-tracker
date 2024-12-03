import React from 'react'

import { IPerson } from '../../core/Person'

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

const AddReqForm = ({ person }: { person: IPerson }) => {
    return (
        <div className="flex-box flex-dir-col">
            <h2 className="bdr pdg">AddRequirementForm</h2>
            <header className="bdr pdg flex-box">
                <div className="bdr pdg btn" onClick={() => {}}>
                    {person.getName()}
                </div>
                <div className="bdr pdg">
                    wallet balance: {person.getWalletBalance()}
                </div>
                <div className="bdr pdg flex-box"></div>
                <div className="bdr pdg">
                    <button className="btn" onClick={() => {}}>
                        close
                    </button>
                </div>
            </header>
            <div className="flex-box">
                <div className="pdg bdr">
                    <h4>date-time area</h4>
                    <div className="pdg flex-box">
                        <div className=" bdr pdg flex-box flex-dir-col">
                            <div>
                                <button className="btn" onClick={() => {}}>
                                    set date
                                </button>
                            </div>
                        </div>
                        <div className="bdr pdg flex-box flex-dir-col">
                            <div>
                                <button className="btn" onClick={() => {}}>
                                    set time
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddReqForm
