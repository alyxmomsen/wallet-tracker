import React, { useContext, useState } from 'react'
import { mainContext } from './MainComponent'
import { IPerson } from '../core/Person'
import { Requirement } from '../core/Requirement'
import { DecrementMoneyRequirementCommand } from '../core/RequirementBehavior'

const AddRequirement = ({ person }: { person: IPerson }) => {
    const ctx = useContext(mainContext)

    const [d, setD] = useState<string>('')

    return (
        <div>
            <div>
                <input
                    onChange={(e) => {
                        setD(e.currentTarget.value)
                    }}
                    value={d}
                    type="datetime-local"
                />
                {d !== '' && (
                    <button
                        onClick={() => {
                            person.addRequirement(
                                new Requirement(
                                    'hello world',
                                    new DecrementMoneyRequirementCommand(199),
                                    new Date(d)
                                )
                            )

                            ctx.update()
                        }}
                    >
                        add {d}
                    </button>
                )}
            </div>
        </div>
    )
}

export default AddRequirement
