import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'
import {
    DecrementMoneyRequirementCommand,
    IncrementMoneyRequirementCommand,
} from '../../../core/RequirementCommand'
import { Requirement } from '../../../core/Requirement'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const ApplyButtonUI = () => {
    const { app, currentPerson } = UseAppContext()

    const { title, value, direction, dateObj } = UseDateFormContext()

    return (
        <div className="flex-box margin-auto">
            <button
                onClick={() => {
                    if (currentPerson) {
                        const newReq = new Requirement(
                            title,
                            direction === 'increment'
                                ? new IncrementMoneyRequirementCommand(value)
                                : new DecrementMoneyRequirementCommand(value),
                            dateObj
                        )

                        console.log({ newReq })

                        currentPerson.addRequirement(newReq)
                    }
                }}
            >
                Apply
            </button>
        </div>
    )
}

export default ApplyButtonUI
