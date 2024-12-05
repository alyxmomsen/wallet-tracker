import React, { useState } from 'react'
import { IPerson } from '../core/person/Person'
import { UseAppContext } from './context/UseAppContext'
import RequirementUI from './requirement-ui/RequirementUI'
import AddRequirementForm from './add-req-form/AddRequirementForm'
import {
    AwakenStatusFactory,
    SlepStatusFactory,
} from '../core/person/PersonStatus'

const PersonCardUI = ({ person }: { person: IPerson }) => {
    const { curPage, setCurPage, update } = UseAppContext()

    let actualReqs = person.getActualRequirementCommands()
    const exec = person.getExecutedRequirementCommands()

    const [actReqs, setAR] = useState(actualReqs)

    const [statuses, setStatuses] = useState([
        new AwakenStatusFactory(),
        new SlepStatusFactory(),
    ])

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
                    {statuses.map((factory) => {
                        return (
                            <button
                                onClick={() => {
                                    person.setStatus(factory.instance())
                                    update()
                                }}
                            >
                                {'status'}
                            </button>
                        )
                    })}
                </div>
                <div>{person.getStatusDescription()}</div>
                <div>
                    <h3>
                        {person.getAllReauirementCommands().length ? (
                            'REQUIREMENTS:'
                        ) : (
                            <button
                                className="btn"
                                onClick={() => {
                                    if (person) {
                                        setCurPage(
                                            <AddRequirementForm
                                                person={person}
                                            />
                                        )
                                    }
                                }}
                            >
                                ADD REQUIREMENT
                            </button>
                        )}
                    </h3>
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
