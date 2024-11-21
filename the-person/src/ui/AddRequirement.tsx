import React, { useContext, useState } from 'react'
import { mainContext } from './MainComponent'
import { IPerson } from '../core/Person'
import { Requirement } from '../core/Requirement'
import { DecrementMoneyRequirementCommand } from '../core/RequirementBehavior'

const AddRequirement = ({ person }: { person: IPerson }) => {
    const ctx = useContext(mainContext)

    const [dateString, setDateString] = useState<string>('')
    const [payValue, setPayValue] = useState(0)
    const [descr, setDescr] = useState<string>('')
    const [requirementTitle, setRequirementTitle] = useState<string>('')

    return (
        <div>
            <div>
                <input
                    onChange={(e) => {
                        setDateString(e.currentTarget.value)
                    }}
                    value={dateString}
                    type="datetime-local"
                />
                <input
                    onChange={(e) =>
                        setPayValue(Number.parseFloat(e.currentTarget.value))
                    }
                    type="number"
                    value={payValue}
                />
                <input
                    onChange={(e) => setRequirementTitle(e.currentTarget.value)}
                    type="text"
                    value={requirementTitle}
                />
                <textarea
                    value={descr}
                    onChange={(e) => {
                        setDescr(e.currentTarget.value)
                    }}
                />
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

                            ctx.update()
                        }}
                    >
                        add {dateString}
                    </button>
                )}
            </div>
        </div>
    )
}

export default AddRequirement
