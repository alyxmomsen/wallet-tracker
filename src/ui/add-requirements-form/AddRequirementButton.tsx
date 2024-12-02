import React from 'react'

import { IPerson } from '../../core/Person'
import { Requirement } from '../../core/Requirement'
import {
    DecrementMoneyRequirementCommand,
    IncrementValueRequirementCommand,
} from '../../core/RequirementCommand'
import { UseAppContext } from '../ApplicationContext'
import { UseDateContext } from './AddRequirementContext'

const AddRequirementButton = ({ person }: { person: IPerson }) => {
    const {
        setHours,
        hours,
        setMinutes,
        minutes,
        month,
        date: day,
        year,
        transactionType,
        transactionValue,
    } = UseDateContext()

    const { update } = UseAppContext()

    console.log({ transactionValue })

    return (
        <div className="pdg bdr">
            <button
                className="btn pdg"
                onClick={() => {
                    person.addRequirement(
                        new Requirement(
                            'some requirement',
                            transactionType === 'dec'
                                ? new DecrementMoneyRequirementCommand(
                                      transactionValue
                                  )
                                : new IncrementValueRequirementCommand(
                                      transactionValue
                                  ),
                            new Date(
                                `${month}-${day}-${year} ${hours}:${minutes}`
                            )
                        )
                    )

                    update()
                }}
            >
                add requirement
            </button>
        </div>
    )
}

export default AddRequirementButton
