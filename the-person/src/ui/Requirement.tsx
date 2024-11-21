import React, { useContext } from 'react'
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

    return (
        <div className="bdr pdg flex-item clickable">
            <h3>requires:</h3>
            <h4>{date}</h4>
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
        </div>
    )
}

export default Requirement
