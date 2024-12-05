import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'
import {
    DecrementMoneyRequirementCommand,
    IncrementMoneyRequirementCommand,
} from '../../../core/RequirementCommand'

import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const ApplyButtonUI = () => {
    const { app, currentPerson } = UseAppContext()

    const { title, value, setValue, direction, dateObj, description } =
        UseDateFormContext()

    return (
        <div className="flex-box">
            <button
                onClick={() => {
                    if (currentPerson) {
                        const newReq =
                            direction === 'increment'
                                ? new IncrementMoneyRequirementCommand(
                                      value,
                                      title,
                                      description,
                                      dateObj
                                  )
                                : new DecrementMoneyRequirementCommand(
                                      value,
                                      title,
                                      description,
                                      dateObj
                                  )

                        console.log({ newReq })

                        currentPerson.addRequirementCommand(newReq)
                        // setValue(
                        //     averageValueUtil(currentPerson)
                        // );
                    }
                }}
            >
                Apply
            </button>
        </div>
    )
}

export default ApplyButtonUI
