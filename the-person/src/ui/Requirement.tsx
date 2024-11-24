import React from 'react'
import { IRequirement } from '../core/Requirement'
import { IPerson } from '../core/Person'
import { UseAppContext } from './ApplicationContext'

const Requirement = ({
    requirement,
    person,
}: {
    requirement: IRequirement
    person: IPerson
}) => {
    const { update } = UseAppContext()

    return (
        <div className="pdg bdr">
            {requirement.getFormatedStringDate()}

            {requirement.checkIfActual() ? (
                <button
                    className="btn"
                    onClick={() => {
                        requirement.satisfy(person)
                        update()
                    }}
                >
                    exec
                </button>
            ) : null}
            <div>{requirement.getBehaviorDescription()}</div>
        </div>
    )
}

export default Requirement
