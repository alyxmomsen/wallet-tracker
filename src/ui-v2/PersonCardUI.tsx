import React, { useState } from 'react'
import { IPerson } from '../core/Person'
import { UseAppContext } from './context/UseAppContext'
import RequirementUI from './requirement-ui/RequirementUI'

type TValues = {
    date: number
    month: number
    year: number
    values: {
        balanceBefore: number
        balanceAfter: number
        value: number
    }
}
const PersonCardUI = ({ person }: { person: IPerson }) => {
    const { curPage, setCurPage, update } = UseAppContext()

    let actualReqs = person.getActualRequirementCommands()
    const exec = person.getExecutedRequirementCommands()

    const [actReqs, setAR] = useState(actualReqs)

    return (
        <div className="">
            <h2>PersonCardUI</h2>

            <h3>{person.getName()}</h3>
            <div>
                <div>
                    <h3>Wallet</h3>
                    <div>{person.getWalletBalance()}</div>
                </div>
                <div>
                    <h3>REQUIREMENTS:</h3>
                    <div className="flex-box">
                        {person
                            .getActualRequirementCommands()
                            .map((requirement, i) => {
                                const d = requirement.getExecutionDate()

                                return (
                                    <div
                                        onClick={() => {
                                            setCurPage(
                                                <RequirementUI
                                                    requirement={requirement}
                                                    person={person}
                                                    key={i}
                                                />
                                            )
                                        }}
                                        className={
                                            'bdr pdg btn  hover--parent flex-box flex-dir-col' +
                                            (requirement.checkIfExecuted()
                                                ? ' requirement--executed'
                                                : '')
                                        }
                                    >
                                        <div>
                                            = {requirement.getDescription()} =
                                        </div>
                                        <div className="flex-box">
                                            <div>{d.getDate()}</div>
                                            <div>{d.getMonth() + 1}</div>
                                            <div>{d.getFullYear()}</div>
                                        </div>
                                        {!requirement.checkIfExecuted() ? (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    requirement.execute(person)
                                                    update()
                                                }}
                                                className="hover--child btn"
                                            >
                                                execute
                                            </button>
                                        ) : null}
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonCardUI
