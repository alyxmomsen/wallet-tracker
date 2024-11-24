import React, { useContext, useState } from 'react'
// import { mainContext } from './MainComponent'
import { IPerson } from '../core/Person'
import { IRequirement } from '../core/Requirement'
import { AppContext } from '../App'

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
    const ctx = useContext(AppContext)

    const [isRolledDown, setIsRolledDown] = useState(false)

    return (
        <div
            onClick={() => {
                if (!isRolledDown) {
                    setIsRolledDown(true)
                }
            }}
            className={`bdr pdg flex-item ${isRolledDown ? '' : ' btn'}`}
        >
            <div>{date}</div>
            {isRolledDown && (
                <>
                    <div
                        onClick={() => {
                            setIsRolledDown(false)
                        }}
                        className="pdg btn"
                    >
                        rolup
                    </div>
                    <h4>requires:</h4>
                    <div>
                        <p>{title}</p>
                        <p>{description}</p>
                        <button
                            className="btn"
                            onClick={() => {
                                requirement.satisfy(person)

                                ctx?.update()
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
