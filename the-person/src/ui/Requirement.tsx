import React, { useContext, useState } from 'react'
import { mainContext } from './MainComponent'
import { IPerson } from '../core/Person'
import { IRequirement } from '../core/Requirement'

const Requirement = ({
    date,
    title,
    description,
    person,
    requirement,
}: {
    date: string
    title: string
    description: string
    person: IPerson
    requirement: IRequirement
}) => {
    const ctx = useContext(mainContext)

    const [isRolledDown, setIsRolledDown] = useState(false)

    return (
        <div
            onClick={() => {
                if (!isRolledDown) {
                    setIsRolledDown(true)
                }
            }}
            className={`bdr pdg flex-item ${isRolledDown ? '' : ' clickable'}`}
        >
            <div>{date}</div>
            {isRolledDown && (
                <>
                    <div
                        onClick={() => {
                            setIsRolledDown(false)
                        }}
                        className="pdg clickable"
                    >
                        rolup
                    </div>
                    <h4>requires:</h4>
                    <div>
                        <p>{title}</p>
                        <p>{description}</p>
                        <button
                            onClick={() => {
                                requirement.satisfy(person)

                                ctx.update()
                            }}
                        >
                            execute
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Requirement
