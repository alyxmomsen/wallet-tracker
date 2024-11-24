import React, { useContext, useState } from 'react'
// import { mainContext } from './MainComponent'
import { IPerson } from '../core/Person'
import { Requirement } from '../core/Requirement'
import { DecrementMoneyRequirementCommand } from '../core/RequirementBehavior'
import { AppContext } from '../App'

const AddRequirementForm = ({ person }: { person: IPerson }) => {
    const ctx = useContext(AppContext)
    const [isRolledDown, setIsRolledDown] = useState(false)
    const [dateString, setDateString] = useState<string>(
        (() => {
            const now = new Date()
            return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}`
        })()
    )
    const [payValue, setPayValue] = useState(500)
    const [descr, setDescr] = useState<string>('the Description')
    const [requirementTitle, setRequirementTitle] =
        useState<string>('the Title')

    return (
        <div>
            <button
                className="btn"
                onClick={
                    isRolledDown
                        ? () => {
                              setIsRolledDown(false)
                          }
                        : () => {
                              setIsRolledDown(true)
                          }
                }
            >
                {isRolledDown ? 'RollUp' : 'Add Requirement'}
            </button>
            {isRolledDown && (
                <div className="flex-box flex">
                    <div className="bdr pdg">
                        <h3>Date</h3>
                        <input
                            onChange={(e) => {
                                console.log(e.currentTarget.value)
                                setDateString(e.currentTarget.value)
                            }}
                            value={dateString}
                            type="datetime-local"
                            // type='date'
                        />
                        {false && <input type="time" />}
                    </div>
                    <div className="bdr pdg">
                        <h3>value</h3>
                        <input
                            onChange={(e) => {
                                setPayValue(
                                    Number.parseFloat(e.currentTarget.value)
                                )
                            }}
                            type="number"
                            value={payValue}
                            step={100}
                        />
                    </div>
                    <div className="bdr pdg">
                        <h3>Title</h3>
                        <input
                            onChange={(e) =>
                                setRequirementTitle(e.currentTarget.value)
                            }
                            type="text"
                            value={requirementTitle}
                        />
                    </div>
                    <div className="bdr pdg">
                        <h3>Description</h3>
                        <textarea
                            value={descr}
                            onChange={(e) => {
                                setDescr(e.currentTarget.value)
                            }}
                        />
                    </div>
                    {dateString !== '' && (
                        <button
                            onClick={() => {
                                person.addRequirement(
                                    new Requirement(
                                        descr,
                                        new DecrementMoneyRequirementCommand(
                                            payValue
                                        ),
                                        new Date(dateString)
                                    )
                                )

                                ctx?.update()
                            }}
                        >
                            add {dateString}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default AddRequirementForm
