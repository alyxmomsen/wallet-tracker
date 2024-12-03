import React from 'react'

import { IPerson } from '../../core/Person'
import { Requirement } from '../../core/Requirement'
import {
    DecrementMoneyRequirementCommand,
    IncrementMoneyRequirementCommand,
} from '../../core/RequirementCommand'
import { UseAppCtx } from '../AppCtxProvider'
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

    const { update } = UseAppCtx()

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
                                : new IncrementMoneyRequirementCommand(
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
